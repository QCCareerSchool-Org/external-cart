export const makeupCourseCodes = [ 'AM', 'MZ', 'SK', 'SF', 'MW', 'HS', 'AB', 'PW', 'PF' ] as const;

export type MakeupCourseCode = typeof makeupCourseCodes[number];

export const isMakeupCourseCode = (value: unknown): value is MakeupCourseCode => {
  return typeof value === 'string' && makeupCourseCodes.includes(value as MakeupCourseCode);
}
