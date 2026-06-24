'use client';

import type { FC } from "react";
import { useCartState } from "../cartState";
import type { Course } from "@/domain/course";
import { Checkbox } from "./checkbox";
import type { CourseCode } from "@/domain/courseCode";

interface Props {
  courses: Course[];
}

export const CourseSelection: FC<Props> = ({ courses }) => {
  const [cartState, cartDispatch] = useCartState();

  const handleChange = (courseCode: CourseCode, checked: boolean): void => {
    if (!checked) {
      cartDispatch({ type: 'COURSE_REMOVED', payload: courseCode });
      return;
    }

    cartDispatch({ type: 'COURSE_ADDED', payload: courseCode });
  };

  return (
    <section>
      <h2>Choose Your Courses</h2>
      {courses.map(c => (
        <Checkbox
          key={c.code}
          course={c}
          checked={cartState.selected.includes(c.code)}
          onChange={handleChange}
        />
      ))}
    </section>
  );
};
