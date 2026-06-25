import Big from 'big.js';

import type { Currency } from './currency';

export interface Price {
  currency: Currency;
  amount: Big;
  original?: Big;
  paymentPlan?: {
    installmentCount: number;
    deposit: Big;
    installmentAmount: Big;
  };
}

export interface SerializedPrice {
  currency: Currency;
  amount: string;
  original?: string;
  paymentPlan?: {
    installmentCount: number;
    deposit: string;
    installmentAmount: string;
  };
}

export const serializePrice = (price: Price): SerializedPrice => {
  return {
    currency: price.currency,
    amount: price.amount.toString(),
    original: price.original?.toString(),
    paymentPlan: price.paymentPlan && {
      installmentCount: price.paymentPlan.installmentCount,
      deposit: price.paymentPlan.deposit.toString(),
      installmentAmount: price.paymentPlan.installmentAmount.toString(),
    },
  };
};

export const deserializePrice = (price: SerializedPrice): Price => {
  return {
    currency: price.currency,
    amount: Big(price.amount),
    original: price.original === undefined ? undefined : Big(price.original),
    paymentPlan: price.paymentPlan && {
      installmentCount: price.paymentPlan.installmentCount,
      deposit: Big(price.paymentPlan.deposit),
      installmentAmount: Big(price.paymentPlan.installmentAmount),
    },
  };
};
