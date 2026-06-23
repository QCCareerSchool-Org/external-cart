'use client';

import type { ActionDispatch, FC, PropsWithChildren, } from "react";
import { createContext, useContext, useEffect, useReducer, useRef } from "react";

import type { CartStatePersistence } from "./persistence";
import { createCookieCartStatePersistence } from "./persistence";
import type { CartAction, CartState } from "./state";
import { cartReducer, initialCartState } from "./state";

const defaultCartStatePersistence = createCookieCartStatePersistence();

const cartStateContext = createContext<CartState>(initialCartState);
const cartDispatchContext = createContext<ActionDispatch<[action: CartAction]>>(state => state);

interface Props {
  persistence?: CartStatePersistence;
}

export const CartStateProvider: FC<PropsWithChildren<Props>> = ({ persistence = defaultCartStatePersistence, children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const firstRender = useRef(true);

  useEffect(() => {
    const persistedState = persistence.load();
    if (persistedState) {
      dispatch({ type: 'HYDRATE', payload: persistedState });
    }
  }, [persistence]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    persistence.save(state);
  }, [persistence, state]);

  return (
    <cartStateContext.Provider value={state}>
      <cartDispatchContext.Provider value={dispatch}>
        {children}
      </cartDispatchContext.Provider>
    </cartStateContext.Provider>
  );
};

export const useCartState = (): [state: CartState, dispatch: ActionDispatch<[action: CartAction]>] => {
  const state = useContext(cartStateContext);
  const dispatch = useContext(cartDispatchContext);

  return [state, dispatch];
};

export type { CartAction, CartState } from "./state";
export type { CartStatePersistence } from "./persistence";
export { createCookieCartStatePersistence } from "./persistence";
