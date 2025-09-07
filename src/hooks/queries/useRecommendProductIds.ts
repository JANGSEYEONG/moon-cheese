import { useSuspenseQuery } from '@tanstack/react-query';
import { http } from '../../utils/http';
import { queryKeys } from './queryKeys';

interface RecommendProductIdsResponse {
  recommendProductIds: number[];
}
export function useRecommendProductIds(id: number) {
  return useSuspenseQuery({
    queryKey: queryKeys.product.recommend(id),
    queryFn: () => http.get<RecommendProductIdsResponse>(`/api/product/recommend/${id}`),
  });
}
