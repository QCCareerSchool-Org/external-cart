export const schoolNames = [ 'QC Design School', 'QC Event School', 'QC Makeup Academy', 'QC Pet Studies', 'QC Wellness Studies', 'Winghill Writing School', 'Paw Parent Academy' ] as const;

export type SchoolName = typeof schoolNames[number];

export const isSchoolName = (value: unknown): value is SchoolName => {
  return typeof value === 'string' && schoolNames.includes(value as SchoolName);
}