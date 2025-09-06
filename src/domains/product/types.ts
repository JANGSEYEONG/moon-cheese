export interface RecentProduct {
  id: number;
  thumbnail: string;
  name: string;
  price: number;
}

interface BaseProduct {
  id: number;
  name: string;
  stock: number;
  price: number;
  description: string;
  detailDescription: string;
  images: string[];
  rating: number;
}

export interface CheeseProduct extends BaseProduct {
  category: 'CHEESE';
}

export interface CrackerProduct extends BaseProduct {
  category: 'CRACKER';
  isGlutenFree?: boolean;
}

export interface TeaProduct extends BaseProduct {
  category: 'TEA';
  isCaffeineFree?: boolean;
}

export type Product = CheeseProduct | CrackerProduct | TeaProduct;
