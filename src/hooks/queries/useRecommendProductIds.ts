import { useSuspenseQuery } from '@tanstack/react-query';
import { http } from '../../utils/http';
import { queryKeys } from './queryKeys';

interface RecommendProductIdsResponse {
  recommendProductIds: number[];
}
export function useRecommendProductIds(targetProductId: number) {
  return useSuspenseQuery({
    queryKey: queryKeys.product.recommend(targetProductId),
    queryFn: () => http.get<RecommendProductIdsResponse>(`/api/product/recommend/${targetProductId}`),
  });
}
