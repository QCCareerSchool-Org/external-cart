'use server';

import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';
import { redirect } from 'next/navigation';

import type { State } from './state';
import { getCourse } from '@/domain/course';
import type { CourseCode } from '@/domain/courseCode';
import { isCourseCodeArray } from '@/domain/courseCode';
import { addProductLineToShopifyCart } from '@/lib/shopify/addProductLineToShopifyCart';
import { createShopifyCart } from '@/lib/shopify/createShopifyCart';

const getShopifyProductIds = (courseCodes: CourseCode[]): Result<string[]> => {
  const shopifyProductIds: string[] = [];

  for (const courseCode of courseCodes) {
    const course = getCourse(courseCode);
    if (!course?.shopifyProductId) {
      return failure(Error('Course is not available for checkout'));
    }

    shopifyProductIds.push(course.shopifyProductId);
  }

  return success(shopifyProductIds);
};

const createCheckout = async (countryCode: string, shopifyProductIds: string[]): Promise<Result<string>> => {
  try {
    const cartResult = await createShopifyCart(countryCode);
    if (!cartResult.success) {
      console.error(cartResult.error);
      return failure(Error('Could not create Shopify cart'));
    }

    for (const shopifyProductId of shopifyProductIds) {
      const addResult = await addProductLineToShopifyCart(cartResult.value.id, shopifyProductId, countryCode);
      if (!addResult.success) {
        console.error(addResult.error);
        return failure(Error('Could not add course to Shopify cart'));
      }
    }

    return success(cartResult.value.checkoutUrl);
  } catch (error) {
    console.error(error);
    return failure(Error('Could not create Shopify checkout'));
  }
};

export const action = async (_state: State, formData: FormData): Promise<State> => {
  const countryCode = formData.get('countryCode');
  if (typeof countryCode !== 'string') {
    return { error: 'Could not determine checkout country' };
  }

  const courseCodes = formData.getAll('courseCode');
  if (courseCodes.length === 0) {
    return { error: 'Select at least one course before checking out' };
  }

  if (!isCourseCodeArray(courseCodes)) {
    return { error: 'Invalid course selection' };
  }

  const shopifyProductIds = getShopifyProductIds(courseCodes);
  if (!shopifyProductIds.success) {
    return { error: shopifyProductIds.error.message };
  }

  const result = await createCheckout(countryCode, shopifyProductIds.value);
  if (!result.success) {
    return { error: result.error.message };
  }

  redirect(result.value);
};
