'use client';

import { FC } from "react";
import { useCartState } from "../cartState";
import { Course } from "@/domain/course";
import { Checkbox } from "./checkbox";

interface Props {
  courses: Course[];
}

export const CourseSelection: FC<Props> = ({ courses}) => {
  const [cartState, cartDispatch ] = useCartState();

  const handleChange = (shopifyProductId: string): void => {
    cartDispatch({ type: 'COURSE_ADDED', payload: 'MZ' });
  }

  return (
    <section>
      {courses.map(c => (
        <Checkbox
          key={c.shopifyProductId}
          course={c}
          checked={cartState.selected.includes()}
          onChange={handleChange}
        />
      ))}
    </section>
  );
};