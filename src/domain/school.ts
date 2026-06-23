import type { SchoolName } from "./schoolName";
import type { SchoolSlug } from "./schoolSlug";

export interface School {
  name: SchoolName;
  shopifyStoreId: string | undefined;
}

export const schools: Record<SchoolSlug, School> = {
  design: {
    name: 'QC Design School',
    shopifyStoreId: undefined,
  },
  event: {
    name: 'QC Event School',
    shopifyStoreId: undefined,
  },
  makeup: {
    name: 'QC Makeup Academy',
    shopifyStoreId: ''
  },
  pet: {
    name: 'QC Pet Studies',
    shopifyStoreId: undefined,
  },
  wellness: {
    name: 'QC Wellness Studies',
    shopifyStoreId: undefined,
  },
  writing: {
    name: 'Winghill Writing School',
    shopifyStoreId: undefined,
  },
  ppa: { 
    name: 'Paw Parent Academy',
    shopifyStoreId: undefined,
  }

}