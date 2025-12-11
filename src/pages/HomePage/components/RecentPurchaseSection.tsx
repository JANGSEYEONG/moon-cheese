import { Flex, styled } from 'styled-system/jsx';
import { Spacing, Text } from '@/ui-lib';
import { PriceDisplay } from '@/components/PriceDisplay';
import { getRecentProductListQueryOptions } from '@/api/getRecentProductList';
import { useSuspenseQuery } from '@tanstack/react-query';
import { groupBy, sumBy } from 'es-toolkit';

function RecentPurchaseSection() {
  const {
    data: { recentProducts },
  } = useSuspenseQuery(getRecentProductListQueryOptions());

  const productMap = groupBy(recentProducts, product => product.id);
  const productTotals = Object.values(productMap).map(products => ({
    ...products[0],
    totalPrice: sumBy(products, product => product.price),
  }));

  return (
    <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
      <Text variant="H1_Bold">최근 구매한 상품</Text>

      <Spacing size={4} />

      <Flex
        css={{
          bg: 'background.01_white',
          px: 5,
          py: 4,
          gap: 4,
          rounded: '2xl',
        }}
        direction={'column'}
      >
        {productTotals.map(product => (
          <Flex
            css={{
              gap: 4,
            }}
          >
            <styled.img
              src={product.thumbnail}
              alt={product.name}
              css={{
                w: '60px',
                h: '60px',
                objectFit: 'cover',
                rounded: 'xl',
              }}
            />
            <Flex flexDir="column" gap={1}>
              <Text variant="B2_Medium">{product.name}</Text>
              <Text variant="H1_Bold">
                <PriceDisplay price={product.totalPrice} />
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </styled.section>
  );
}

export default RecentPurchaseSection;
