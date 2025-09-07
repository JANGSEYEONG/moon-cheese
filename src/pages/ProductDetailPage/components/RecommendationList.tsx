import { useNavigate } from 'react-router';
import { HStack } from 'styled-system/jsx';
import { keyBy, at, compact } from 'lodash';
import RecommendationListItem from './RecommendationListItem';
import { useRecommendProductIds } from '@/hooks/queries/useRecommendProductIds';
import { useProductList } from '@/hooks/queries/useProductList';

interface RecommendationListProps {
  targetProductId: number;
}
function RecommendationList({ targetProductId }: RecommendationListProps) {
  const navigate = useNavigate();

  const {
    data: { products },
  } = useProductList();
  const {
    data: { recommendProductIds },
  } = useRecommendProductIds(targetProductId);

  const goProductDetail = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const productMap = keyBy(products, 'id');
  const mappedProducts = at(productMap, recommendProductIds);
  const recommendedProducts = compact(mappedProducts);

  return (
    <HStack gap={1.5} overflowX="auto">
      {recommendedProducts.map(product => (
        <RecommendationListItem key={product.id} product={product} onClick={goProductDetail} />
      ))}
    </HStack>
  );
}

export default RecommendationList;
