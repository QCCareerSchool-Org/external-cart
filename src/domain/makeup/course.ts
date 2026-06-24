import type { Course } from "../course";
import type { MakeupCourseCode } from "./courseCode";

type MakeupCourse = Course<MakeupCourseCode>;

export const makeupCourses: MakeupCourse[] = [
  {
    code: 'AB',
    name: 'Airbrush Makeup Workshop',
    shopifyProductId: ''
  },
  {
    code: 'AM',
    name: 'All-Access Program',
    shopifyProductId: ''
  },
  {
    code: 'HS',
    name: 'Hairstyling Workshop',
    shopifyProductId: ''
  },
  {
    code: 'MW',
    name: 'Pro Makeup Workshop',
    shopifyProductId: ''
  },
  {
    code: 'MZ',
    name: 'Master Makeup Artistry',
    shopifyProductId: '16031932678447'
  },
  {
    code: 'PF',
    name: 'Fashion Styling',
    shopifyProductId: ''
  },
  {
    code: 'PW',
    name: 'Portfolio Development Workshop',
    shopifyProductId: ''
  },
  {
    code: 'SF',
    name: 'Special Effects Workshop',
    shopifyProductId: ''
  },
  {
    code: 'SK',
    name: 'Skincare',
    shopifyProductId: '16031945228591'
  },
];

export const getMakeupCourse = (courseCode: MakeupCourseCode): MakeupCourse | undefined => {
  return makeupCourses.find(c => c.code === courseCode);
}
