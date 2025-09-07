/* 회원 등급 */
export const DELIVERY_TYPE = {
  EXPRESS: 'EXPRESS',
  PREMIUM: 'PREMIUM',
} as const;
export type DeliveryType = (typeof DELIVERY_TYPE)[keyof typeof DELIVERY_TYPE];

export const DELIVERY_TYPE_LABEL: Record<DeliveryType, string> = {
  [DELIVERY_TYPE.EXPRESS]: 'Express',
  [DELIVERY_TYPE.PREMIUM]: 'Premium',
};
