'use client';

import { Course } from "@/domain/course";
import { ChangeEventHandler, FC } from "react";

interface Props {
  course: Course;
  checked: boolean;
  onChange: (shopifyProductId: string) => void;
}

export const Checkbox: FC<Props> = ({ course, checked, onChange }) => {
  
  const handleChange: ChangeEventHandler<HTMLInputElement> = () => {
    onChange(course.shopifyProductId);
  }

  return (
    <input type="checkbox" value={course.shopifyProductId} checked={checked} onChange={handleChange} />
  );
}