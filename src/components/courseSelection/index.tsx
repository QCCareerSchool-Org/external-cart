'use client';

import type { FC } from "react";
import { useState } from "react";
import { useCartState } from "../cartState";
import type { Course } from "@/domain/course";
import { Checkbox } from "./checkbox";
import type { CourseCode } from "@/domain/courseCode";
import { selectCourse } from "./action";

interface Props {
  courses: Course[];
  countryCode: string;
}

export const CourseSelection: FC<Props> = ({ courses, countryCode }) => {
  const [cartState, cartDispatch] = useCartState();
  const [pendingCourseCode, setPendingCourseCode] = useState<CourseCode | null>(null);

  const persistSelectedCourse = async (courseCode: CourseCode): Promise<void> => {
    setPendingCourseCode(courseCode);
    try {
      const selectedCourseCodes = cartState.selected.includes(courseCode)
        ? cartState.selected
        : [...cartState.selected, courseCode];
      const result = await selectCourse(courseCode, selectedCourseCodes, countryCode);
      if (result.success) {
        cartDispatch({ type: 'COURSE_ADDED', payload: courseCode });
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPendingCourseCode(null);
    }
  };

  const handleChange = (courseCode: CourseCode, checked: boolean): void => {
    if (!checked) {
      cartDispatch({ type: 'COURSE_REMOVED', payload: courseCode });
      return;
    }

    void persistSelectedCourse(courseCode);
  };

  return (
    <section>
      {courses.map(c => (
        <Checkbox
          key={c.code}
          course={c}
          checked={cartState.selected.includes(c.code)}
          disabled={pendingCourseCode !== null}
          onChange={handleChange}
        />
      ))}
    </section>
  );
};
