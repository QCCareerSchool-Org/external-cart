'use client';

import { Course } from "@/domain/course";
import { School } from "@/domain/school";
import { FC, PropsWithChildren, useActionState } from "react";
import { initialState } from "./state";
import { action } from "./action";
import { useCartState } from "../cartState";

interface Props {
  school: School;
  courses: Course[]
  checkoutUrl?: string;
}

export const Form: FC<PropsWithChildren<Props>> = ({ school, courses, checkoutUrl, children }) => {
  const [ cartState ] = useCartState();
  const [state, dispatch, isPending] = useActionState(action, initialState);

  return (
    <form action={dispatch}>
      <input type="hidden" name="checkoutUrl" value={checkoutUrl} />
      {cartState.selected.map(c => (
        <input key={c} type="hidden" name="courseCode" value={c} />
      ))}
      {children}
      <button type="submit" disabled={!checkoutUrl || isPending}>Checkout</button>
    </form>
  )

}