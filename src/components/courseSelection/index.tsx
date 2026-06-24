'use client';

import type { FC } from 'react';

import { Card } from '../card';
import { Checkbox } from './checkbox';
import { useCartState } from '../cartState';
import { SectionEyebrow } from '../sectionEyebrow';
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
    <Card as="section">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionEyebrow tone="light">Step 1</SectionEyebrow>
          <h2 className="mt-1">Choose your courses</h2>
        </div>
        <p className="text-sm font-semibold text-muted">{cartState.selected.length} selected</p>
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
    </Card>
  );
};
