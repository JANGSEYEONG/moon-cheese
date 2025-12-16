export const GRADE_TYPE = {
  EXPLORER: 'EXPLORER',
  PILOT: 'PILOT',
  COMMANDER: 'COMMANDER',
} as const;
export type GradeType = (typeof GRADE_TYPE)[keyof typeof GRADE_TYPE];

export interface GradePoint {
  type: GradeType;
  minPoint: number;
}

export const SHIPPING_GRADE_TYPE = {
  EXPRESS: 'EXPRESS',
  PREMIUM: 'PREMIUM',
} as const;
export type ShippingGradeType = (typeof SHIPPING_GRADE_TYPE)[keyof typeof SHIPPING_GRADE_TYPE];
