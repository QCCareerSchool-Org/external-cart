import type { CourseCode } from '@/domain/courseCode';
import { isCourseCode } from '@/domain/courseCode';

export interface ShopifyState {
  cartId: string;
  selectedCourseCodes: CourseCode[];
}

const isShopifyState = (value: unknown): value is ShopifyState => {
  return typeof value === 'object' && value !== null
    && 'cartId' in value && typeof value.cartId === 'string'
    && 'selectedCourses' in value && Array.isArray(value.selectedCourses) && value.selectedCourses.every(isCourseCode);
};

export const parseShopifyState = (value: string | null | undefined): ShopifyState | null => {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    if (isShopifyState(parsed)) {
      return parsed;
    }
  } catch (err) {
    console.error(err);
  }

  return {
    cartId: value,
    selectedCourseCodes: [],
  };
};

export const serializeShopifyState = (state: ShopifyState): string => JSON.stringify(state);

export const hasCourseInShopifyState = (state: ShopifyState, courseCode: CourseCode): boolean => {
  return state.selectedCourseCodes.includes(courseCode);
};

export const addCourseToShopifyState = (state: ShopifyState, courseCode: CourseCode): ShopifyState => {
  if (state.selectedCourseCodes.includes(courseCode)) {
    return state;
  }

  return {
    ...state,
    selectedCourseCodes: [ ...state.selectedCourseCodes, courseCode ],
  };
};
