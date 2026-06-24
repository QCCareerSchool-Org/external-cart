'use client';

import type { Course } from "@/domain/course";
import type { CourseCode } from "@/domain/courseCode";
import type { ChangeEventHandler, FC } from "react";

interface Props {
  course: Course;
  checked: boolean;
  onChange: (courseCode: CourseCode, checked: boolean) => void;
}

export const Checkbox: FC<Props> = ({ course, checked, onChange }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    onChange(course.code, e.target.checked);
  };

  return (
    <input type="checkbox" name="courseCode" value={course.code} checked={checked} onChange={handleChange} />
  );
};
