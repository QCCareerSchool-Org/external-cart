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
