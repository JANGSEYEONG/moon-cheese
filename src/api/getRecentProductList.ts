import type { RecentProduct } from '@/models/product';
import { http } from '@/utils/http';
import { queryOptions } from '@tanstack/react-query';

interface GetRecentProductListResponse {
  recentProducts: RecentProduct[];
}
const getRecentProductList = async () => {
  return await http.get<GetRecentProductListResponse>('/api/recent/product/list');
};

export const getRecentProductListQueryOptions = () =>
  queryOptions({
    queryKey: ['recentProductList'],
    queryFn: getRecentProductList,
  });
