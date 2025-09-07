import { GRADE, type Grade } from '../grade';

export const DELIVERY_METHOD = {
  EXPRESS: 'EXPRESS',
  PREMIUM: 'PREMIUM',
} as const;
export type DeliveryMethod = (typeof DELIVERY_METHOD)[keyof typeof DELIVERY_METHOD];

export const DELIVERY_METHOD_LABEL: Record<DeliveryMethod, string> = {
  [DELIVERY_METHOD.EXPRESS]: 'Express',
  [DELIVERY_METHOD.PREMIUM]: 'Premium',
} as const;

export const DELIVERY_POLICY: Record<
  DeliveryMethod,
  {
    deliveryPeriod: string;
    gradeCharges: Record<Grade, { baseCharge: number; freeThreshold?: number }>;
  }
> = {
  [DELIVERY_METHOD.PREMIUM]: {
    deliveryPeriod: '당일 배송',
    gradeCharges: {
      [GRADE.EXPLORER]: { baseCharge: 2, freeThreshold: 30 },
      [GRADE.PILOT]: { baseCharge: 1, freeThreshold: 30 },
      [GRADE.COMMANDER]: { baseCharge: 0 },
    },
  },
  [DELIVERY_METHOD.EXPRESS]: {
    deliveryPeriod: '2~3일 후 도착 예정',
    gradeCharges: {
      [GRADE.EXPLORER]: { baseCharge: 0 },
      [GRADE.PILOT]: { baseCharge: 0 },
      [GRADE.COMMANDER]: { baseCharge: 0 },
    },
  },
};
