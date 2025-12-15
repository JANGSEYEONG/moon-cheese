export interface RecentProduct {
  id: number;
  thumbnail: string;
  name: string;
  price: number;
}

export const PRODUCT_CATEGORY = {
  CHEESE: 'CHEESE',
  CRACKER: 'CRACKER',
  TEA: 'TEA',
} as const;
export type ProductCategory = (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY];

interface ProductBase {
  id: number;
  name: string;
  stock: number;
  price: number;
  description: string;
  detailDescription: string;
  images: string[];
  rating: number;
}

interface CheeseProduct extends ProductBase {
  category: typeof PRODUCT_CATEGORY.CHEESE;
}

interface CrackerProduct extends ProductBase {
  category: typeof PRODUCT_CATEGORY.CRACKER;
  isGlutenFree?: boolean;
}

interface TeaProduct extends ProductBase {
  category: typeof PRODUCT_CATEGORY.TEA;
  isCaffeineFree?: boolean;
}

export type Product = CheeseProduct | CrackerProduct | TeaProduct;
