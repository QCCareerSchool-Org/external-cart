import { isCourseCode, type CourseCode } from "@/domain/courseCode";

export interface CartState {
  selected: CourseCode[];
  shopifyCartId: string | undefined;
}

export const initialCartState: CartState = {
  selected: [],
  shopifyCartId: undefined,
};

export type CartAction =
  | { type: 'COURSE_ADDED'; payload: CourseCode }
  | { type: 'COURSE_REMOVED'; payload: CourseCode }
  | { type: 'CART_CREATED'; payload: string }
  | { type: 'HYDRATE'; payload: CartState };

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'COURSE_ADDED':
      if (state.selected.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        selected: [...state.selected, action.payload],
      };
    case 'COURSE_REMOVED':
      return {
        ...state,
        selected: state.selected.filter(courseCode => courseCode !== action.payload),
      };
    case 'CART_CREATED':
      return { ...state, shopifyCartId: action.payload };
    case 'HYDRATE':
      return action.payload;
  }
};

export const isCartState = (value: unknown): value is CartState => {
  return typeof value === "object" && value !== null
  && "selected" in value && Array.isArray(value.selected) && value.selected.every(isCourseCode)
  && (('shopifyCartId' in value && typeof value.shopifyCartId === 'string') || (!('shopifyCartId' in value)));
};
