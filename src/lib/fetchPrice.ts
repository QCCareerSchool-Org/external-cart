import Big from 'big.js';

import { Price } from "@/domain/price";
import { fetchProduct } from "./shopify/fetchProduct";
import { isCurrencyCode } from "@/domain/currencyCode";
import { Course } from '@/domain/course';

export const fetchPrice = async (course: Course, countryCode: string): Promise<Price | undefined> => {
  const productResult = await fetchProduct(course.shopifyProductId, countryCode);
  if (!productResult.success) {
    return;
  }

  const variant = productResult.value.variants.edges[0].node;

  const currencyCode = variant.price.currencyCode;
  if (!isCurrencyCode(currencyCode)) {
    console.error('unsupported currency code');
    return;
  }

  return {
    currencyCode,
    amount: Big(variant.price.amount),
    original: variant.compareAtPrice === null ? undefined : Big(variant.compareAtPrice.amount),
    paymentPlan: undefined,
  }
}