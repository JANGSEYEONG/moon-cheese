import { useNavigate } from 'react-router';
import { HStack } from 'styled-system/jsx';
import { keyBy, pick } from 'es-toolkit';
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

  const productsMap = keyBy(products, product => product.id);
  const recommendProducts = Object.values(pick(productsMap, recommendProductIds));

  return (
    <HStack gap={1.5} overflowX="auto">
      {recommendProducts.map(product => (
        <RecommendationListItem key={product.id} product={product} onClick={goProductDetail} />
      ))}
    </HStack>
  );
}

export default RecommendationList;
