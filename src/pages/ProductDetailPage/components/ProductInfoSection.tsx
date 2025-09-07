import PriceDisplay from '@/components/PriceDisplay';
import type { Product } from '@/domains/product';
import { useCartStore } from '@/stores/cartStore';
import { Button, Counter, RatingGroup, Spacing, Text } from '@/ui-lib';
import Tag from '@/ui-lib/components/tag';
import { productCategoryToTagType } from '@/utils/categoryMapper';
import { useState } from 'react';
import { Box, Divider, Flex, Stack, styled } from 'styled-system/jsx';

interface ProductInfoSectionProps {
  product: Product;
}

function ProductInfoSection({ product }: ProductInfoSectionProps) {
  const { id, category, name, rating, price, stock } = product;
  const { getItemQuantity, removeItem, addItem } = useCartStore();

  const cartQuantity = getItemQuantity(id);
  const isInCart = cartQuantity > 0;
  const [selectedQuantity, setSelectedQuantity] = useState(cartQuantity);

  const canDecreaseQuantity = !isInCart && selectedQuantity > 0;
  const canIncreaseQuantity = !isInCart && selectedQuantity < stock;

  const decreaseQuantity = () => {
    setSelectedQuantity(prev => prev - 1);
  };

  const increaseQuantity = () => {
    setSelectedQuantity(prev => prev + 1);
  };

  const handleCartButtonClick = () => {
    if (isInCart) {
      removeItem(id);
      setSelectedQuantity(0);
    } else {
      addItem(product, selectedQuantity);
    }
  };

  return (
    <styled.section css={{ bg: 'background.01_white', p: 5 }}>
      {/* 상품 정보 */}
      <Box>
        <Stack gap={2}>
          <Tag type={productCategoryToTagType(category)} />
          <Text variant="B1_Bold">{name}</Text>
          <RatingGroup value={rating} readOnly label={`${rating.toFixed(1)}`} />
        </Stack>
        <Spacing size={4} />
        <Text variant="H1_Bold">
          <PriceDisplay price={price} />
        </Text>
      </Box>

      <Spacing size={5} />

      {/* 재고 및 수량 조절 */}
      <Flex justify="space-between" alignItems="center">
        <Flex alignItems="center" gap={2}>
          <Text variant="C1_Medium">재고</Text>
          <Divider orientation="vertical" color="border.01_gray" h={4} />
          <Text variant="C1_Medium" color="secondary.02_orange">
            {stock}EA
          </Text>
        </Flex>
        <Counter.Root>
          <Counter.Minus onClick={decreaseQuantity} disabled={!canDecreaseQuantity} />
          <Counter.Display value={selectedQuantity} />
          <Counter.Plus onClick={increaseQuantity} disabled={!canIncreaseQuantity} />
        </Counter.Root>
      </Flex>

      <Spacing size={5} />

      {/* 장바구니 버튼 */}
      <Button fullWidth color="primary" size="lg" onClick={handleCartButtonClick}>
        {isInCart ? '장바구니에서 제거' : '장바구니 담기'}
      </Button>
    </styled.section>
  );
}

export default ProductInfoSection;
