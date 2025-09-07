import { useSuspenseQuery } from '@tanstack/react-query';
import { http } from '../../utils/http';
import { queryKeys } from './queryKeys';
import type { Product } from '@/domains/product';

export function useProductById(id: number) {
  return useSuspenseQuery({
    queryKey: queryKeys.product.byId(id),
    queryFn: () => http.get<Product>(`/api/product/${id}`),
  });
}
