import type { CurrencyCode } from './currencyCode';

export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
}

const currenciesByCode: Record<CurrencyCode, Currency> = {
  CAD: {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: '$',
  },
  AUD: {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: '$',
  },
  NZD: {
    code: 'NZD',
    name: 'New Zealand Dollar',
    symbol: '$',
  },
  GBP: {
    code: 'GBP',
    name: 'Pound Sterling',
    symbol: '£',
  },
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
  },
};

export const currencies = Object.values(currenciesByCode);

export const getCurrency = (currencyCode: CurrencyCode): Currency => {
  return currenciesByCode[currencyCode];
};

const gbpCountries = new Set([ 'GB', 'IM', 'GG', 'JE', 'GS' ]);
const audCountries = new Set([ 'AU', 'CX', 'CC', 'NR', 'NF', 'HM' ]);
const nzdCountries = new Set([ 'NZ', 'TK', 'NU', 'PN' ]);

/** determines if we charge people from a country in pounds sterling */
export const gbpCountry = (countryCode: string | null): boolean => {
  if (countryCode === null) {
    return false;
  }
  return gbpCountries.has(countryCode.toUpperCase());
};

/** determines if we charge people from a country in Australian dollars */
export const audCountry = (countryCode: string | null): boolean => {
  if (countryCode === null) {
    return false;
  }
  return audCountries.has(countryCode.toUpperCase());
};

/** determines if we charge people from a country in Australian dollars */
export const nzdCountry = (countryCode: string | null): boolean => {
  if (countryCode === null) {
    return false;
  }
  return nzdCountries.has(countryCode.toUpperCase());
};
