import type { Course } from '../course';
import type { DesignCourseCode } from './courseCode';

export const designCourses: Course<DesignCourseCode>[] = [
  {
    code: 'ad',
    name: 'Airbrush Makeup Workshop',
    shopifyProductId: '16031945228591',
  },
  {
    code: 'ap',
    name: 'Aging in Place',
    shopifyProductId: '16031945228591',
  },
  {
    code: 'cc',
    name: 'Color Consultant Course',
    shopifyProductId: '16031945228591',
  },
  {
    code: 'db',
    name: 'Accelerate Your Design Business',
    shopifyProductId: '16031945228591',
  },
  {
    code: 'ed',
    name: 'Event Decor',
    shopifyProductId: '16031932678447',
  },
  {
    code: 'fd',
    name: 'Floral Design',
    shopifyProductId: '16031945228591',
  },
  {
    code: 'fs',
    name: 'Feng Shui Design',
    shopifyProductId: '16031945228591',
  },
  {
    code: 'i2',
    name: 'Interior Design & Decorating',
    shopifyProductId: '16031945228591',
  },
  {
    code: 'ld',
    name: 'Landscape Design',
    shopifyProductId: '16031945228591',
  },
  {
    code: 'po',
    name: 'Professional Organizing',
    shopifyProductId: '16031945228591',
  },
  {
    code: 'st',
    name: 'Home Staging',
    shopifyProductId: '16031945228591',
  },
  {
    code: 'vd',
    name: 'Virtual Design Training',
    shopifyProductId: '16031945228591',
  },
];

export const getMakeupCourse = (courseCode: DesignCourseCode): Course<DesignCourseCode> | undefined => {
  return designCourses.find(c => c.code === courseCode);
};
