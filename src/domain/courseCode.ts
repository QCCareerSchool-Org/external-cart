import type  { DesignCourseCode } from "./design/courseCode";
import { isDesignCourseCode } from "./design/courseCode";
import type { MakeupCourseCode } from "./makeup/courseCode";
import { isMakeupCourseCode } from "./makeup/courseCode";

export type CourseCode =
  | DesignCourseCode
  | MakeupCourseCode;

export const isCourseCode = (value: unknown): value is CourseCode => {
  return isMakeupCourseCode(value) || isDesignCourseCode(value);
}

export const isCourseCodeArray = (value: unknown[]): value is CourseCode[] => {
  return Array.isArray(value) && value.every(isCourseCode);
}
