export const designCourseCodes = [ 'i2', 'st', 'ms', 'fs', 'po', 'ld', 'ed', 'cc', 'fd', 'ap', 'db', 'vd', 'ad' ] as const;

export type DesignCourseCode = typeof designCourseCodes[number];

export const isDesignCourseCode = (value: unknown): value is DesignCourseCode => {
  return typeof value === 'string' && designCourseCodes.includes(value as DesignCourseCode);
};
