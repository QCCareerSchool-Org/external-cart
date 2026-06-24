'use client';

import type { ChangeEventHandler, FC } from 'react';

import { Card } from '../card';
import type { Course } from '@/domain/course';
import type { CourseCode } from '@/domain/courseCode';
import type { SerializedPrice } from '@/domain/price';
import { cn } from '@/lib/cn';

interface Props {
  course: Course;
  price?: SerializedPrice;
  checked: boolean;
  onChange: (courseCode: CourseCode, checked: boolean) => void;
}

const formatPrice = (price: SerializedPrice): string => {
  return `${price.currencyCode} ${Number(price.amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const Checkbox: FC<Props> = ({ course, price, checked, onChange }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    onChange(course.code, e.target.checked);
  };
  const cardBaseClassName = 'flex gap-4 p-4';
  const markerBaseClassName = 'mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-black transition';
  const markerClassName = checked
    ? cn(markerBaseClassName, 'border-[#e36537] bg-[#e36537] text-white')
    : cn(markerBaseClassName, 'border-[#c9ad87] bg-[#fffaf1] text-transparent');

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
        as="span"
        variant={checked ? 'optionSelected' : 'option'}
        className={checked
          ? cn(cardBaseClassName, '-translate-y-0.5')
          : cn(cardBaseClassName, 'group-hover:-translate-y-0.5 group-hover:border-[#c28f58]')}
      >
        <span className={markerClassName}>
          ✓
        </span>
        <span className="min-w-0 flex-1">
          <span className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#2a1a11] px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#f6c44f]">
              {course.code}
            </span>
            {!price && (
              <span className="rounded-full bg-[#ead8be] px-2.5 py-1 text-xs font-bold text-[#7a6249]">
                Price pending
              </span>
            )}
          </span>
          <span className="block text-lg font-black leading-tight tracking-[-0.02em] text-[#2a1a11]">
            {course.name}
          </span>
          <span className="mt-2 block text-sm font-bold text-[#8a6043]">
            {price ? formatPrice(price) : 'Checkout availability confirmed on submit'}
          </span>
        </span>
      </Card>
    </label>
  );
};
