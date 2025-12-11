import { http } from '@/utils/http';

interface GetRecentProductListResponse {
  recentProducts: {
    id: number;
    thumbnail: string;
    name: string;
    price: number;
  }[];
}
const getRecentProductList = async () => {
  return await http.get<GetRecentProductListResponse>('/api/recent/product/list');
};

export const getRecentProductListQueryOptions = () => ({
  queryKey: ['recentProductList'],
  queryFn: getRecentProductList,
});
