'use client';

import { FC } from "react";
import { useCartState } from "../cartState";
import { Course } from "@/domain/course";
import { Checkbox } from "./checkbox";
import { CourseCode } from "@/domain/courseCode";

interface Props {
  courses: Course[];
}

export const CourseSelection: FC<Props> = ({ courses }) => {
  const [cartState, cartDispatch ] = useCartState();

  const handleChange = (courseCode: CourseCode, checked: boolean): void => {
    if (checked) {
      cartDispatch({ type: 'COURSE_ADDED', payload: courseCode });
    } else {
      cartDispatch({ type: 'COURSE_REMOVED', payload: courseCode });
    }    
  }

  return (
    <section>
      {courses.map(c => (
        <Checkbox
          key={c.shopifyProductId}
          course={c}
          checked={cartState.selected.includes(c.code)}
          onChange={handleChange}
        />
      ))}
    </section>
  );
};