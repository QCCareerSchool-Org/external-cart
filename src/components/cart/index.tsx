import type { FC } from 'react';

import { CartStateProvider } from '../cartState';
import { CourseSelection } from '../courseSelection';
import { Summary } from '../summary';
import { Form } from '@/components/form';
import type { Course } from '@/domain/course';
import { getCoursePrices } from '@/lib/getCoursePrices';

interface Props {
  courses: Course[];
  countryCode: string;
}

export const Cart: FC<Props> = async ({ courses, countryCode }) => {
  const prices = await getCoursePrices(courses, countryCode);

  return (
    <CartStateProvider>
      <Form countryCode={countryCode}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
          <CourseSelection courses={courses} prices={prices} />
          <Summary courses={courses} prices={prices} />
        </div>
      </Form>
    </CartStateProvider>
  );
};
