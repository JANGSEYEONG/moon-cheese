import type { RecentProduct } from '@/models/product';
import { http } from '@/utils/http';

interface GetRecentProductListResponse {
  recentProducts: RecentProduct[];
}
const getRecentProductList = async () => {
  return await http.get<GetRecentProductListResponse>('/api/recent/product/list');
};

export const getRecentProductListQueryOptions = () => ({
  queryKey: ['recentProductList'],
  queryFn: getRecentProductList,
});
