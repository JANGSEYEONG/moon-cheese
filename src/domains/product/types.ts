import type { ProductCategory } from './constants';

export interface RecentProduct {
  id: number;
  thumbnail: string;
  name: string;
  price: number;
}

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  stock: number;
  price: number;
  description: string;
  detailDescription: string;
  images: string[];
  rating: number;
  isGlutenFree?: boolean;
  isCaffeineFree?: boolean;
}
