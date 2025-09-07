import { useSuspenseQuery } from '@tanstack/react-query';
import { http } from '../../utils/http';
import { queryKeys } from './queryKeys';
import type { Product } from '@/domains/product';

interface GetProductListResponse {
  products: Product[];
}

export const useProductList = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.product.list(),
    queryFn: () => http.get<GetProductListResponse>('/api/product/list'),
  });
};
