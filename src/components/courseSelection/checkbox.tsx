'use client';

import { Course } from "@/domain/course";
import { CourseCode } from "@/domain/courseCode";
import { ChangeEventHandler, FC } from "react";

interface Props {
  course: Course;
  checked: boolean;
  onChange: (courseCode: CourseCode, checked: boolean) => void;
}

export const Checkbox: FC<Props> = ({ course, checked, onChange }) => {
  
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    onChange(course.code, e.target.checked);
  }

  return (
    <input type="checkbox" value={course.shopifyProductId} checked={checked} onChange={handleChange} />
  );
}