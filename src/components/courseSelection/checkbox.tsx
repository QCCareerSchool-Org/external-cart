'use client';

import type { ChangeEventHandler, FC } from 'react';

import { CourseOption } from './courseOption';
import type { Course } from '@/domain/course';
import type { CourseCode } from '@/domain/courseCode';
import { deserializePrice, type SerializedPrice } from '@/domain/price';
import { formatPrice } from '@/lib/formatPrice';

interface Props {
  course: Course;
  serializedPrice?: SerializedPrice;
  checked: boolean;
  onChange: (courseCode: CourseCode, checked: boolean) => void;
}

export const Checkbox: FC<Props> = ({ course, serializedPrice, checked, onChange }) => {
  const price = serializedPrice ? deserializePrice(serializedPrice) : undefined;

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    onChange(course.code, e.target.checked);
  };

  return (
    <label className="group relative block cursor-pointer">
      <input
        className="peer sr-only"
        type="checkbox"
        name="courseCode"
        value={course.code}
        checked={checked}
        onChange={handleChange}
      />
      <CourseOption selected={checked}>
        <div className="text-sm sm:text-base font-bold leading-tight text-foreground">{course.name}</div>
        <div className="mt-1 text-xs sm:text-sm leading-tight text-muted">{price ? formatPrice(price) : '(Price pending)'}</div>
      </CourseOption>
    </label>
  );
};
