import type { Product } from '@/models/product';
import { http } from '@/utils/http';
import { queryOptions } from '@tanstack/react-query';

interface GetProductListResponse {
  products: Product[];
}
const getProductList = async () => {
  return await http.get<GetProductListResponse>('/api/product/list');
};

export const getProductListQueryOptions = () =>
  queryOptions({
    queryKey: ['productList'],
    queryFn: getProductList,
  });
