import { getProductListQueryOptions } from '@/api/getProductList';
import { getProductRecommendQueryOptions } from '@/api/getProductRecommend';
import { PriceDisplay } from '@/components/PriceDisplay';
import type { Product } from '@/models/product';
import { Spacing, Text } from '@/ui-lib';
import { useSuspenseQueries } from '@tanstack/react-query';
import { intersectionWith } from 'es-toolkit';
import { Link } from 'react-router';
import { HStack, styled } from 'styled-system/jsx';
import RecommendationProductItem from './RecommendationProductItem';

interface RecommendationSectionProps {
  productId: number;
}
function RecommendationSection({ productId }: RecommendationSectionProps) {
  const [
    {
      data: { products },
    },
    {
      data: { recommendProductIds },
    },
  ] = useSuspenseQueries({
    queries: [getProductListQueryOptions(), getProductRecommendQueryOptions({ id: productId })],
  });

  const recommendationProducts = intersectionWith(
    products,
    recommendProductIds,
    (product, recommendProductId) => product.id === recommendProductId
  );

  return (
    <styled.section css={{ bg: 'background.01_white', px: 5, pt: 5, pb: 6 }}>
      <Text variant="H2_Bold">추천 제품</Text>

      <Spacing size={4} />

      <HStack gap={1.5} overflowX="auto">
        {recommendationProducts.map(product => (
          <RecommendationProductCard key={product.id} product={product} />
        ))}
      </HStack>
    </styled.section>
  );
}

export default RecommendationSection;

interface RecommendationProductCardProps {
  product: Product;
}
function RecommendationProductCard({ product }: RecommendationProductCardProps) {
  return (
    <Link to={`/product/${product.id}`}>
      <RecommendationProductItem.Root>
        <RecommendationProductItem.Image src={product.images[0]} alt={product.name} />
        <RecommendationProductItem.Info name={product.name} rating={product.rating} />
        <RecommendationProductItem.Price>
          <PriceDisplay price={product.price} />
        </RecommendationProductItem.Price>
      </RecommendationProductItem.Root>
    </Link>
  );
}
