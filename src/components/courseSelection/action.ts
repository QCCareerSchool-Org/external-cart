'use server';

import { cookies } from "next/headers";

import { getCourse } from "@/domain/course";
import type { CourseCode } from "@/domain/courseCode";
import { addProductLineToShopifyCart } from "@/lib/shopify/addProductLineToShopifyCart";
import { createShopifyCart } from "@/lib/shopify/createShopifyCart";
import { isShopifyCart, ShopifyCart } from "@/lib/shopify";

const shopifyCartCookieName = "shopify_cart";
const shopifyCartCookieMaxAge = 60 * 60 * 24 * 30;

interface ActionResult {
  success: boolean;
  message?: string;
}

const loadShopifyCart = async (): Promise<ShopifyCart | undefined> => {
  const cookieStore = await cookies();
  const value = cookieStore.get(shopifyCartCookieName)?.value;
  if (!value) {
    return;
  }
  try {
    const cart: unknown = JSON.parse(value);
    if (!isShopifyCart(cart)) {
      return;
    }
    return cart;
  } catch { }
};

const saveShopifyCart = async (cart: ShopifyCart): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: shopifyCartCookieName,
    value: JSON.stringify(cart),
    httpOnly: true,
    maxAge: shopifyCartCookieMaxAge,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
};

export async function selectCourse(courseCode: CourseCode, selectedCourseCodes: CourseCode[], countryCode: string): Promise<ActionResult> {
  try {
    const uniqueSelectedCourseCodes = [...new Set([...selectedCourseCodes, courseCode])];
    const course = getCourse(courseCode);

    if (!course?.shopifyProductId) {
      return {
        success: false,
        message: 'Course is not available for checkout',
      };
    }

    const existingCart = await loadShopifyCart();

    if (existingCart) {
      const addResult = await addProductLineToShopifyCart(existingCart.id, course.shopifyProductId, countryCode);
      if (addResult.success) {
        return { success: true };
      }

      console.error(addResult.error);
    }

    const selectedShopifyProductIds: string[] = [];
    for (const selectedCourseCode of uniqueSelectedCourseCodes) {
      const selectedCourse = getCourse(selectedCourseCode);
      if (!selectedCourse?.shopifyProductId) {
        return {
          success: false,
          message: 'Course is not available for checkout',
        };
      }

      selectedShopifyProductIds.push(selectedCourse.shopifyProductId);
    }

    const cartResult = await createShopifyCart(countryCode);
    if (!cartResult.success) {
      console.error(cartResult.error);
      return {
        success: false,
        message: existingCart ? 'Could not recreate Shopify cart' : 'Could not create Shopify cart',
      };
    }

    await saveShopifyCart(cartResult.value);

    for (const shopifyProductId of selectedShopifyProductIds) {
      const addResult = await addProductLineToShopifyCart(cartResult.value.id, shopifyProductId, countryCode);
      if (!addResult.success) {
        console.error(addResult.error);
        return {
          success: false,
          message: 'Could not add course to Shopify cart',
        };
      }
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Could not add course to Shopify cart',
    };
  }
}
