export const designCourseCodes = [ 'AM', 'MZ', 'SK', 'SF', 'MW', 'HS', 'AB', 'PW', 'PF' ] as const;

export type DesignCourseCode = typeof designCourseCodes[number];

export const isDesignCourseCode = (value: unknown): value is DesignCourseCode => {
  return typeof value === 'string' && designCourseCodes.includes(value as DesignCourseCode);
}
