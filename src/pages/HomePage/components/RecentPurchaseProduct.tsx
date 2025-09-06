import { Flex, styled } from 'styled-system/jsx';
import { Text } from '@/ui-lib';
import PriceDisplay from '@/components/PriceDisplay';
import type { RecentProduct } from '@/domains/product';

type RecentPurchaseProductProps = RecentProduct;
function RecentPurchaseProduct({ thumbnail, name, price }: RecentPurchaseProductProps) {
  return (
    <Flex
      css={{
        gap: 4,
      }}
    >
      <styled.img
        src={thumbnail}
        alt="item"
        css={{
          w: '60px',
          h: '60px',
          objectFit: 'cover',
          rounded: 'xl',
        }}
      />
      <Flex flexDir="column" gap={1}>
        <Text variant="B2_Medium">{name}</Text>
        <Text variant="H1_Bold">
          <PriceDisplay price={price} />
        </Text>
      </Flex>
    </Flex>
  );
}

export default RecentPurchaseProduct;
