export const makeupCourseCodes = [ 'am', 'mz', 'sk', 'sf', 'mw', 'hs', 'ab', 'pw', 'pf' ] as const;

export type MakeupCourseCode = typeof makeupCourseCodes[number];

export const isMakeupCourseCode = (value: unknown): value is MakeupCourseCode => {
  return typeof value === 'string' && makeupCourseCodes.includes(value as MakeupCourseCode);
};
