import type { Product } from '@/models/product';
import { http } from '@/utils/http';
import { queryOptions } from '@tanstack/react-query';

interface GetProductRequest {
  id: number;
}

type GetProductResponse = Product;

const getProduct = async ({ id }: GetProductRequest) => {
  return await http.get<GetProductResponse>(`/api/product/${id}`);
};

export const getProductQueryOptions = ({ id }: GetProductRequest) =>
  queryOptions({
    queryKey: ['product', id],
    queryFn: () => getProduct({ id }),
  });
