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

export const SHIPPING_METHOD_TYPE = {
  EXPRESS: 'EXPRESS',
  PREMIUM: 'PREMIUM',
} as const;
export type ShippingMethodType = (typeof SHIPPING_METHOD_TYPE)[keyof typeof SHIPPING_METHOD_TYPE];

export interface GradeShipping {
  type: GradeType; // 'EXPLORER' | 'PILOT' | 'COMMANDER';
  shippingFee: number; // 배송비
  freeShippingThreshold: number; // 배송비 무료 기준 구매금액
}
