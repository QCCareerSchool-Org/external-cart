'use client';

import { Course } from "@/domain/course";
import { School } from "@/domain/school";
import { FC, PropsWithChildren, useActionState } from "react";
import { initialState } from "./state";
import { action } from "./action";

interface Props {
  school: School;
  courses: Course[]
}

export const Form: FC<PropsWithChildren<Props>> = ({ school, courses, children }) => {
  const [state, dispatch, isPending] = useActionState(action, initialState);

  return (
    <form action={dispatch}>
        {children}
      <button type="submit" disabled={isPending}>Checkout</button>
    </form>
  )

}