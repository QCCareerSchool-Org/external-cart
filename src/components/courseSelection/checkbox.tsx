'use client';

import type { ChangeEventHandler, FC } from 'react';

import type { Course } from '@/domain/course';
import type { CourseCode } from '@/domain/courseCode';
import type { SerializedPrice } from '@/domain/price';

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
  const cardClassName = checked
    ? 'flex gap-4 rounded-3xl border border-[#e36537] bg-[#fff2df] p-4 shadow-[0_16px_34px_rgba(227,101,55,0.18)] transition duration-200 -translate-y-0.5'
    : 'flex gap-4 rounded-3xl border border-[#dfccb0] bg-white/80 p-4 shadow-[0_10px_26px_rgba(71,44,25,0.08)] transition duration-200 group-hover:-translate-y-0.5 group-hover:border-[#c28f58]';
  const markerClassName = checked
    ? 'mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#e36537] bg-[#e36537] text-sm font-black text-white transition'
    : 'mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#c9ad87] bg-[#fffaf1] text-sm font-black text-transparent transition';

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
      <span className={cardClassName}>
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
      </span>
    </label>
  );
};
