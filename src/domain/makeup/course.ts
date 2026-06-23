import { Course } from "../course";
import { MakeupCourseCode } from "./courseCode";

export const makeupCourses: Record<MakeupCourseCode, Course> = {
  AB: {
    name: 'Airbrush Makeup Workshop',
    shopifyProductId: ''
  },
  AM: {
    name: 'All-Access Program',
    shopifyProductId: ''
  },
  HS: {
    name: 'Hairstyling Workshop',
    shopifyProductId: ''
  },
  MW: {
    name: 'Pro Makeup Workshop',
    shopifyProductId: ''
  },
  MZ: {
    name: 'Master Makeup Artistry',
    shopifyProductId: ''
  },
  PF: {
    name: 'Fashion Styling',
    shopifyProductId: ''
  },
  PW: {
    name: 'Portfolio Development Workshop',
    shopifyProductId: ''
  },
  SF: {
    name: 'Special Effects Workshop',
    shopifyProductId: ''
  },
  SK: {
    name: 'Skincare',
    shopifyProductId: ''
  },
}

export const getMakeupCourse = (courseCode: MakeupCourseCode) => makeupCourses[courseCode];