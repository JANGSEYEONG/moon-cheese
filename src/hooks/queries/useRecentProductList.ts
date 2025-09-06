import { useSuspenseQuery } from '@tanstack/react-query';
import { http } from '../../utils/http';
import { queryKeys } from './queryKeys';

interface GetRecentProductListResponse {
  recentProducts: {
    id: number;
    thumbnail: string;
    name: string;
    price: number;
  }[];
}

export const useRecentProductList = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.recentProductList(),
    queryFn: () => http.get<GetRecentProductListResponse>('/api/recent/product/list'),
  });
};
