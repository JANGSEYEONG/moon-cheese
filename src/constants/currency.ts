/* 통화 종류 */
export const CURRENCY_TYPE = {
  USD: 'USD',
  KRW: 'KRW',
} as const;
export type CurrencyType = (typeof CURRENCY_TYPE)[keyof typeof CURRENCY_TYPE];
