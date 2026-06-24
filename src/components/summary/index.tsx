'use client';

import Big from 'big.js';
import type { FC } from 'react';

import { Card } from '../card';
import { useCartState } from '../cartState';
import { SectionEyebrow } from '../sectionEyebrow';
import type { Course } from '@/domain/course';
import type { CourseCode } from '@/domain/courseCode';
import type { CoursePriceMap } from '@/domain/coursePrice';
import type { CurrencyCode } from '@/domain/currencyCode';
import { deserializePrice, type Price } from '@/domain/price';

interface Props {
  courses: Course[];
  prices: CoursePriceMap;
}

const formatPrice = (amount: Big, currencyCode: CurrencyCode): string => {
  return `${currencyCode} ${amount.toFixed(2)}`;
};

interface SelectedPrice {
  courseCode: CourseCode;
  price: Price;
}

export const Summary: FC<Props> = ({ courses, prices }) => {
  const [ cartState ] = useCartState();

  const selectedPrices = cartState.selected.flatMap<SelectedPrice>(courseCode => {
    return prices[courseCode]
      ? [ { courseCode, price: deserializePrice(prices[courseCode]) } ]
      : [];
  });

  const totals = selectedPrices.reduce<Partial<Record<CurrencyCode, Big>>>((acc, selectedPrice) => {
    acc[selectedPrice.price.currencyCode] = (acc[selectedPrice.price.currencyCode] ?? Big(0)).plus(selectedPrice.price.amount);
    return acc;
  }, {});

  const selectedCourses = cartState.selected.flatMap(courseCode => {
    const course = courses.find(c => c.code === courseCode);
    return course ? [ course ] : [];
  });
  const selectedWithoutPrices = cartState.selected.filter(courseCode => !prices[courseCode]);

  return (
    <Card as="section" variant="panelDark" className="lg:sticky lg:top-6">
      <div className="mb-5 border-b border-foreground-inverse/20 pb-5">
        <SectionEyebrow tone="dark">Step 2</SectionEyebrow>
        <h2 className="mt-1 font-serif text-3xl font-black tracking-[-0.04em]">Review</h2>
        <p className="mt-2 text-sm leading-6 text-foreground-inverse/70">
          Your checkout cart is created only when you press checkout.
        </p>
      </div>

      {selectedCourses.length === 0 ? (
        <Card as="div" variant="empty">
          No courses selected yet.
        </Card>
      ) : (
        <div className="space-y-3">
          {selectedCourses.map(course => {
            const selectedPrice = selectedPrices.find(item => item.courseCode === course.code);

            return (
              <Card as="div" variant="optionDark" key={course.code} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-highlight">{course.code}</p>
                  <p className="mt-1 text-sm font-bold leading-5">{course.name}</p>
                </div>
                <p className="shrink-0 text-sm font-black text-foreground-inverse">
                  {selectedPrice
                    ? formatPrice(selectedPrice.price.amount, selectedPrice.price.currencyCode)
                    : 'Pending'}
                </p>
              </Card>
            );
          })}
        </div>
      )}

      <div className="mt-5 border-t border-foreground-inverse/20 pt-5">
        {Object.entries(totals).length === 0 ? (
          <p className="text-sm text-foreground-inverse/70">Totals will appear here.</p>
        ) : (
          Object.entries(totals).map(([ currencyCode, total ]) => (
            <div key={currencyCode} className="flex items-end justify-between gap-4">
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-highlight">Total</span>
              <span className="font-serif text-3xl font-black tracking-[-0.04em]">
                {formatPrice(total, currencyCode as CurrencyCode)}
              </span>
            </div>
          ))
        )}
      </div>

      {selectedWithoutPrices.length > 0 && (
        <p className="mt-4 rounded-2xl bg-accent/20 p-3 text-sm font-semibold text-accent-muted">
          Price unavailable for: {selectedWithoutPrices.join(', ')}
        </p>
      )}
    </Card>
  );
};
