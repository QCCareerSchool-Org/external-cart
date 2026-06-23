'use client';

import { Course, getCourse } from "@/domain/course";
import { CourseCode } from "@/domain/courseCode";
import { School, schools } from "@/domain/school";
import { SchoolSlug } from "@/domain/schoolSlug"
import { FC, PropsWithChildren, useActionState } from "react";
import { initialState } from "./state";
import { action } from "./action";
import { CartStateProvider } from "../cartState";

interface Props {
  school: School;
  courses: Course[]
}

export const Form: FC<PropsWithChildren<Props>> = ({ school, courses, children }) => {
  const [state, dispatch, isPending] = useActionState(action, initialState);

  return (
    <form action={dispatch}>
      <CartStateProvider>
        {children}
      </CartStateProvider>
      <button type="submit" disabled={isPending}>Checkout</button>
    </form>
  )

}