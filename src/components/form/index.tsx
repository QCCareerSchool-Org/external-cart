'use client';

import type { FC, PropsWithChildren, SubmitEventHandler } from "react";
import { useActionState } from "react";
import { initialState } from "./state";
import { action } from "./action";
import { useCartState } from "../cartState";

interface Props {
  countryCode: string;
}

const preventFormReset: SubmitEventHandler<HTMLFormElement> = e => {
  e.preventDefault();
};

export const Form: FC<PropsWithChildren<Props>> = ({ countryCode, children }) => {
  const [cartState] = useCartState();
  const [state, dispatch, isPending] = useActionState(action, initialState);

  return (
    <form action={dispatch} onReset={preventFormReset}>
      <input type="hidden" name="countryCode" value={countryCode} />
      {children}
      {state.error && <p>{state.error}</p>}
      <button type="submit" disabled={cartState.selected.length === 0 || isPending}>Checkout</button>
    </form>
  );
};
