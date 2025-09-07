export const PRODUCT_CATEGORY = {
  CHEESE: 'CHEESE',
  CRACKER: 'CRACKER',
  TEA: 'TEA',
} as const;
export type ProductCategory = (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY];

export const PRODUCT_CATEGORY_LABEL: Record<ProductCategory, string> = {
  [PRODUCT_CATEGORY.CHEESE]: '치즈',
  [PRODUCT_CATEGORY.CRACKER]: '크래커',
  [PRODUCT_CATEGORY.TEA]: '티',
};

export const PRODUCT_CATEGORY_WITH_ALL = {
  ALL: 'ALL',
  ...PRODUCT_CATEGORY,
} as const;
export type ProductTabCategoryWithAll = (typeof PRODUCT_CATEGORY_WITH_ALL)[keyof typeof PRODUCT_CATEGORY_WITH_ALL];

export const PRODUCT_CATEGORY_LABEL_WITH_ALL: Record<ProductTabCategoryWithAll, string> = {
  ALL: '전체',
  ...PRODUCT_CATEGORY_LABEL,
};
