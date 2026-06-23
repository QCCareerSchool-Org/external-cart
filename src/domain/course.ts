import { CourseCode } from "./courseCode";
import { getMakeupCourse } from "./makeup/course";
import { isMakeupCourseCode } from "./makeup/courseCode";

export interface Course {
  name: string;
  shopifyProductId: string;
}

export const getCourse = (courseCode: CourseCode): Course | undefined => {
  if (isMakeupCourseCode(courseCode)) {
    return getMakeupCourse(courseCode);
  }
} 