'use client';

import type { ChangeEventHandler, FC } from 'react';

import { Card } from '../card';
import type { Course } from '@/domain/course';
import type { CourseCode } from '@/domain/courseCode';
import { deserializePrice, type SerializedPrice } from '@/domain/price';
import { cn } from '@/lib/cn';
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
  const cardBaseClassName = 'flex gap-4 p-4';
  const markerBaseClassName = 'mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-black transition';
  const markerClassName = checked
    ? cn(markerBaseClassName, 'border-primary bg-primary text-foreground-inverse')
    : cn(markerBaseClassName, 'border-border bg-surface text-transparent');

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
      <Card
        variant={checked ? 'optionSelected' : 'option'}
        className={checked
          ? cn(cardBaseClassName, '-translate-y-0.5')
          : cn(cardBaseClassName, 'group-hover:-translate-y-0.5 group-hover:border-primary')}
      >
        <span className={markerClassName}>✓</span>
        <span className="min-w-0 flex-1">
          <div className="text-lg font-bold leading-tight text-foreground">
            {course.name}
          </div>
          <div className="mt-2 text-sm font-bold text-muted">
            {price ? formatPrice(price) : '(Price pending)'}
          </div>
        </span>
      </Card>
    </label>
  );
};
