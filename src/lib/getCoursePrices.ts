import { unstable_cache } from "next/cache";

import type { Course } from "@/domain/course";
import type { CoursePriceMap } from "@/domain/coursePrice";
import type { SerializedPrice } from "@/domain/price";
import { fetchPrice } from "./fetchPrice";

const getCachedPrice = unstable_cache(
  async (shopifyProductId: string, countryCode: string): Promise<SerializedPrice | undefined> => {
    return fetchPrice(shopifyProductId, countryCode);
  },
  ['shopify-price'],
  {
    revalidate: 60 * 15,
    tags: ['shopify-prices'],
  },
);

export const getCoursePrices = async (courses: Course[], countryCode: string): Promise<CoursePriceMap> => {
  const prices: CoursePriceMap = {};

  await Promise.all(courses.map(async course => {
    if (!course.shopifyProductId) {
      return;
    }

    const price = await getCachedPrice(course.shopifyProductId, countryCode);
    if (price) {
      prices[course.code] = price;
    }
  }));

  return prices;
};
