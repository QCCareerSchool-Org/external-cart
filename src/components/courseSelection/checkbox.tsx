'use client';

import type { Course } from "@/domain/course";
import type { CourseCode } from "@/domain/courseCode";
import type { ChangeEventHandler, FC } from "react";

interface Props {
  course: Course;
  checked: boolean;
  disabled: boolean;
  onChange: (courseCode: CourseCode, checked: boolean) => void;
}

export const Checkbox: FC<Props> = ({ course, checked, disabled, onChange }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    onChange(course.code, e.target.checked);
  };

  return (
    <input type="checkbox" value={course.code} checked={checked} disabled={disabled} onChange={handleChange} />
  );
};
