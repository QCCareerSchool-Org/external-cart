'use client';

import type { FC } from 'react';

import { Button } from '../button';
import { Card } from '../card';
import { useFormContext } from '../form/context';
import { useCartState } from '../providers/cartState';
import { SectionEyebrow } from '../sectionEyebrow';
import { SummarySection } from './summarySection';
import type { Course } from '@/domain/course';
import type { CourseCode } from '@/domain/courseCode';
import type { CoursePriceMap } from '@/domain/coursePrice';
import { deserializePrice, type Price } from '@/domain/price';
import { formatPrice } from '@/lib/formatPrice';
import Image from 'next/image';

import ShopifyIcon from './shopify.svg'

interface Props {
  courses: Course[];
  serializedPrices: CoursePriceMap;
}

interface SelectedPrice {
  courseCode: CourseCode;
  price: Price;
}

export const Summary: FC<Props> = ({ courses, serializedPrices }) => {
  const [ cartState ] = useCartState();
  const { isPending, state } = useFormContext();

  const prices = Object.fromEntries(
    Object.entries(serializedPrices).map(([ key, value ]) => [ key, deserializePrice(value) ]),
  );

  const selectedPrices = cartState.selected.flatMap<SelectedPrice>(courseCode => {
    return prices[courseCode]
      ? [ { courseCode, price: prices[courseCode] } ]
      : [];
  });

  const totals = selectedPrices.reduce<Price[]>((acc, selectedPrice) => {
    const { currency } = selectedPrice.price;

    if (!acc.some(total => total.currency.code === currency.code)) {
      return [ ...acc, { amount: selectedPrice.price.amount, currency } ];
    }

    return acc.map(total => {
      return total.currency.code === currency.code
        ? { ...total, amount: total.amount.plus(selectedPrice.price.amount) }
        : total;
    });
  }, []);

  const selectedCourses = cartState.selected.flatMap(courseCode => {
    const course = courses.find(c => c.code === courseCode);
    return course ? [ course ] : [];
  });

  return (
    <Card as="section" className="lg:sticky lg:top-6">
      <div>
        <SectionEyebrow>Step 2</SectionEyebrow>
        <h2 className="mt-1">Review</h2>
        <p className="mt-2 leading-6 text-foreground/80">
          Review your selections and total, then continue to checkout when you&apos;re ready.
        </p>
      </div>

      {selectedCourses.length > 0 && (
        <SummarySection>
          {selectedCourses.map(course => {
            const selectedPrice = selectedPrices.find(item => item.courseCode === course.code);

            return (
              <div key={course.code} className="mt-3 flex flex-row justify-between first:mt-0">
                <div className="text-sm tracking-tight">{course.name}</div>
                <div className="shrink-0 text-sm tracking-tight font-bold">{selectedPrice && formatPrice(selectedPrice.price)}</div>
              </div>
            );
          })}
        </SummarySection>
      )}

      {totals.length > 0 && (
        <SummarySection>
          {totals.map(total => (
            <div key={total.currency.code} className="flex items-end justify-between gap-4">
              <div className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Total</div>
              <div className="text-xl font-bold tracking-[-0.04em]">{formatPrice(total)}</div>
            </div>
          ))}
        </SummarySection>
      )}

      <SummarySection>
        <p className="text-sm font-semibold text-foreground/70">
          {cartState.selected.length === 0
            ? 'Select at least one course to continue.'
            : `${cartState.selected.length} course${cartState.selected.length === 1 ? '' : 's'} selected.`}
        </p>
        {state.error && (
          <p className="mt-3 rounded-2xl bg-primary-muted px-4 py-2 text-sm font-semibold text-primary">
            {state.error}
          </p>
        )}
        <Button className="mt-4 w-full py-3" type="submit" disabled={cartState.selected.length === 0 || isPending}>
          <Image src={ShopifyIcon} height={28} alt="" />
          {/* {isPending ? 'Creating checkout' : 'Checkout'} */}
        </Button>
      </SummarySection>
    </Card>
  );
};
