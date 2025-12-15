import type { Product } from '@/models/product';
import { http } from '@/utils/http';

interface GetProductListResponse {
  products: Product[];
}
const getProductList = async () => {
  return await http.get<GetProductListResponse>('/api/product/list');
};

export const getProductListQueryOptions = () => ({
  queryKey: ['productList'],
  queryFn: getProductList,
});
