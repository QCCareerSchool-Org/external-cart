import type { CourseCode } from "@/domain/courseCode";

export interface CartState {
  selected: CourseCode[];
}

export const initialCartState: CartState = {
  selected: [],
};

export type CartAction =
  | { type: 'COURSE_ADDED'; payload: CourseCode }
  | { type: 'COURSE_REMOVED'; payload: CourseCode }
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
    case 'HYDRATE':
      return action.payload;
  }
};
