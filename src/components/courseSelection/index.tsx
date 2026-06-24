'use client';

import type { FC } from 'react';

import { useCartState } from '../cartState';
import { Checkbox } from './checkbox';
import type { Course } from '@/domain/course';
import type { CourseCode } from '@/domain/courseCode';
import type { CoursePriceMap } from '@/domain/coursePrice';

interface Props {
  courses: Course[];
  prices: CoursePriceMap;
}

export const CourseSelection: FC<Props> = ({ courses, prices }) => {
  const [ cartState, cartDispatch ] = useCartState();

  const handleChange = (courseCode: CourseCode, checked: boolean): void => {
    if (!checked) {
      cartDispatch({ type: 'COURSE_REMOVED', payload: courseCode });
      return;
    }

    cartDispatch({ type: 'COURSE_ADDED', payload: courseCode });
  };

  return (
    <section className="rounded-[2rem] border border-[#d8c4a5] bg-[#fffaf1]/85 p-4 shadow-[0_18px_60px_rgba(69,43,24,0.12)] backdrop-blur sm:p-6">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a84d2a]">Step 1</p>
          <h2 className="font-serif text-3xl font-black tracking-[-0.04em] text-[#2a1a11]">Choose your courses</h2>
        </div>
        <p className="text-sm font-semibold text-[#7a6249]">{cartState.selected.length} selected</p>
      </div>

      <div className="grid gap-3">
        {courses.map(course => (
          <Checkbox
            key={course.code}
            course={course}
            price={prices[course.code]}
            checked={cartState.selected.includes(course.code)}
            onChange={handleChange}
          />
        ))}
      </div>
    </section>
  );
};
