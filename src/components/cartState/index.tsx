'use client';

import { CourseCode } from "@/domain/courseCode";
import { ActionDispatch, createContext, FC, PropsWithChildren, useContext, useReducer } from "react";

type CartState = {
  selected: CourseCode[];
}

const initialCartState = {
  selected: [],
};

type CartAction =
  | { type: 'COURSE_ADDED', payload: CourseCode }
  | { type: 'COURSE_REMOVED', payload: CourseCode };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'COURSE_ADDED':
      return { ...state, selected: [...state.selected, action.payload] };
    case 'COURSE_REMOVED':
      return { ...state, selected: state.selected.filter(c => c !== action.payload) }
  }
}

const cartStateContext = createContext<CartState>(initialCartState);
const cartDispatchContext = createContext<ActionDispatch<[action: CartAction]>>(state => state);

export const CartStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <cartStateContext.Provider value={state}>
      <cartDispatchContext.Provider value={dispatch}>
        {children}
      </cartDispatchContext.Provider>
    </cartStateContext.Provider>
  );
};

export const useCartState = (): [ state: CartState, dispatch: ActionDispatch<[action: CartAction]> ] => {
  const state =  useContext(cartStateContext);
  const dispatch = useContext(cartDispatchContext);

  return [ state, dispatch ];
}
