import { http } from '@/utils/http';

interface GetProductRecommendRequest {
  id: number;
}

interface GetProductRecommendResponse {
  recommendProductIds: number[];
}

const getProductRecommend = async ({ id }: GetProductRecommendRequest) => {
  return await http.get<GetProductRecommendResponse>(`/api/product/recommend/${id}`);
};

export const getProductRecommendQueryOptions = ({ id }: GetProductRecommendRequest) => ({
  queryKey: ['productRecommend', id],
  queryFn: () => getProductRecommend({ id }),
});
