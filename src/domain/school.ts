import type { SchoolName } from './schoolName';
import type { SchoolSlug } from './schoolSlug';

export interface School {
  slug: SchoolSlug;
  name: SchoolName;
  shopifyStoreId: string | undefined;
}

export const schools: School[] = [
  {
    slug: 'design',
    name: 'QC Design School',
    shopifyStoreId: undefined,
  },
  {
    slug: 'event',
    name: 'QC Event School',
    shopifyStoreId: undefined,
  },
  {
    slug: 'makeup',
    name: 'QC Makeup Academy',
    shopifyStoreId: '',
  },
  {
    slug: 'pet',
    name: 'QC Pet Studies',
    shopifyStoreId: undefined,
  },
  {
    slug: 'wellness',
    name: 'QC Wellness Studies',
    shopifyStoreId: undefined,
  },
  {
    slug: 'writing',
    name: 'Winghill Writing School',
    shopifyStoreId: undefined,
  },
  {
    slug: 'ppa',
    name: 'Paw Parent Academy',
    shopifyStoreId: undefined,
  },
];

export const getSchool = (slug: SchoolSlug): School => {
  const school = schools.find(s => s.slug === slug);
  if (!school) {
    throw Error('School not found');
  }

  return school;
};
