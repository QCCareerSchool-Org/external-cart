'use client';

import Big from "big.js";
import { FC } from "react";

import type { CoursePriceMap } from "@/domain/coursePrice";
import type { CourseCode } from "@/domain/courseCode";
import type { CurrencyCode } from "@/domain/currencyCode";
import { deserializePrice, type Price } from "@/domain/price";
import { useCartState } from "../cartState";

interface Props {
  prices: CoursePriceMap;
}

const formatPrice = (amount: Big, currencyCode: CurrencyCode): string => {
  return `${currencyCode} ${amount.toFixed(2)}`;
};

interface SelectedPrice {
  courseCode: CourseCode;
  price: Price;
}

export const Summary: FC<Props> = ({ prices }) => {
  const [cartState] = useCartState();

  const selectedPrices = cartState.selected.flatMap<SelectedPrice>(courseCode => {
    return prices[courseCode]
      ? [{ courseCode, price: deserializePrice(prices[courseCode]) }]
      : [];
  });

  const totals = selectedPrices.reduce<Partial<Record<CurrencyCode, Big>>>((acc, selectedPrice) => {
    acc[selectedPrice.price.currencyCode] = (acc[selectedPrice.price.currencyCode] ?? Big(0)).plus(selectedPrice.price.amount);
    return acc;
  }, {});

  const selectedWithoutPrices = cartState.selected.filter(courseCode => !prices[courseCode]);

  return (
    <section>
      <h2>Summary</h2>
      {cartState.selected.length === 0 && <p>No courses selected.</p>}
      {Object.entries(totals).map(([currencyCode, total]) => (
        <p key={currencyCode}>Total: {formatPrice(total, currencyCode as CurrencyCode)}</p>
      ))}
      {selectedWithoutPrices.length > 0 && (
        <p>Price unavailable for: {selectedWithoutPrices.join(', ')}</p>
      )}
      <pre>{JSON.stringify(selectedPrices, null, '  ')}</pre>
    </section>
  );
};
