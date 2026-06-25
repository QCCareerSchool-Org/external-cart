import type { Price } from '@/domain/price';

export const formatPrice = (price: Price): string => {
  return `${price.currency.symbol}${Number(price.amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
