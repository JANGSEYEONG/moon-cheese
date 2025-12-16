import { http } from '@/utils/http';
import { queryOptions } from '@tanstack/react-query';

interface GetProductRecommendRequest {
  id: number;
}

interface GetProductRecommendResponse {
  recommendProductIds: number[];
}

const getProductRecommend = async ({ id }: GetProductRecommendRequest) => {
  return await http.get<GetProductRecommendResponse>(`/api/product/recommend/${id}`);
};

export const getProductRecommendQueryOptions = ({ id }: GetProductRecommendRequest) =>
  queryOptions({
    queryKey: ['productRecommend', id],
    queryFn: () => getProductRecommend({ id }),
  });
