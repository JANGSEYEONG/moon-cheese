export interface RecentProduct {
  id: number;
  thumbnail: string;
  name: string;
  price: number;
}

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
  category: 'CHEESE';
}

interface CrackerProduct extends ProductBase {
  category: 'CRACKER';
  isGlutenFree?: boolean;
}

interface TeaProduct extends ProductBase {
  category: 'TEA';
  isCaffeineFree?: boolean;
}

export type Product = CheeseProduct | CrackerProduct | TeaProduct;
