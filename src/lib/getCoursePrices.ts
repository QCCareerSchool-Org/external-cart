import { unstable_cache } from 'next/cache'; // eslint-disable-line camelcase

import { fetchPrice } from './fetchPrice';
import type { Course } from '@/domain/course';
import type { CoursePriceMap } from '@/domain/coursePrice';

const getCachedPrice = unstable_cache(fetchPrice, [], {
  revalidate: 60 * 15,
  tags: [ 'shopify-prices' ],
});

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
