export const schoolSlugs = [ 'design', 'event', 'makeup', 'pet', 'wellness', 'writing', 'ppa' ] as const;

export type SchoolSlug = typeof schoolSlugs[number];

export const isSchoolSlug = (value: unknown): value is SchoolSlug => {
  return typeof value === 'string' && schoolSlugs.includes(value as SchoolSlug);
};
