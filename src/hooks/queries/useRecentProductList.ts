import { useSuspenseQuery } from '@tanstack/react-query';
import { http } from '../../utils/http';
import { queryKeys } from './queryKeys';
import type { RecentProduct } from '@/models/product';

interface GetRecentProductListResponse {
  recentProducts: RecentProduct[];
}

export const useRecentProductList = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.recentProductList(),
    queryFn: () => http.get<GetRecentProductListResponse>('/api/recent/product/list'),
  });
};
