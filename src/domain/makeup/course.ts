import type { Course } from '../course';
import type { MakeupCourseCode } from './courseCode';

type MakeupCourse = Course;

export const makeupCourses: MakeupCourse[] = [
  {
    code: 'ab',
    name: 'Airbrush Makeup Workshop',
    shopifyProductId: '',
  },
  {
    code: 'am',
    name: 'All-Access Program',
    shopifyProductId: '',
  },
  {
    code: 'hs',
    name: 'Hairstyling Workshop',
    shopifyProductId: '',
  },
  {
    code: 'mw',
    name: 'Pro Makeup Workshop',
    shopifyProductId: '',
  },
  {
    code: 'mz',
    name: 'Master Makeup Artistry',
    shopifyProductId: '16031932678447',
  },
  {
    code: 'pf',
    name: 'Fashion Styling',
    shopifyProductId: '',
  },
  {
    code: 'pw',
    name: 'Portfolio Development Workshop',
    shopifyProductId: '',
  },
  {
    code: 'sf',
    name: 'Special Effects Workshop',
    shopifyProductId: '',
  },
  {
    code: 'sk',
    name: 'Skincare',
    shopifyProductId: '16031945228591',
  },
];

export const getMakeupCourse = (courseCode: MakeupCourseCode): MakeupCourse | undefined => {
  return makeupCourses.find(c => c.code === courseCode);
};
