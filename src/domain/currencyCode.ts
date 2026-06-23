const currencyCodes = [ 'CAD', 'USD', 'GBP', 'AUD', 'NZD' ] as const;

export type CurrencyCode = typeof currencyCodes[number];

export const isCurrencyCode = (value: unknown): value is CurrencyCode => {
  return typeof value === 'string' && currencyCodes.includes(value as CurrencyCode);
};
