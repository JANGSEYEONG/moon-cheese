import { PriceDisplay } from '@/components/PriceDisplay';
import type { Product, ProductCategory } from '@/models/product';
import { useCartStore } from '@/stores/useCartStore';
import { Button, Counter, RatingGroup, Spacing, Text } from '@/ui-lib';
import Tag, { type TagType } from '@/ui-lib/components/tag';
import { useState } from 'react';
import { Box, Divider, Flex, Stack, styled } from 'styled-system/jsx';

interface ProductInfoSectionProps {
  product: Product;
}

function ProductInfoSection({ product }: ProductInfoSectionProps) {
  return (
    <styled.section css={{ bg: 'background.01_white', p: 5 }}>
      <InfoBox product={product} />
      <Spacing size={5} />=
      <BuyBox product={product} />
    </styled.section>
  );
}

export default ProductInfoSection;

function InfoBox({ product }: { product: Product }) {
  return (
    <Box>
      <Stack gap={2}>
        <Tag type={getCategoryTagType(product.category)} />
        <Text variant="B1_Bold">{product.name}</Text>
        <RatingGroup value={product.rating} readOnly label={`${product.rating.toFixed(1)}`} />
      </Stack>
      <Spacing size={4} />
      <Text variant="H1_Bold">
        <PriceDisplay price={product.price} />
      </Text>
    </Box>
  );
}

function BuyBox({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(0);

  const { cart, increaseQuantity, removeItem } = useCartStore();
  const cartItem = cart.find(item => item.productId === product.id);

  const isInCart = Boolean(cartItem);

  return (
    <>
      <Flex justify="space-between" alignItems="center">
        <Flex alignItems="center" gap={2}>
          <Text variant="C1_Medium">재고</Text>
          <Divider orientation="vertical" color="border.01_gray" h={4} />
          <Text variant="C1_Medium" color="secondary.02_orange">
            {product.stock}EA
          </Text>
        </Flex>
        <Counter.Root>
          <Counter.Minus
            onClick={() => {
              setQuantity(quantity - 1);
            }}
            disabled={isInCart || quantity <= 0}
          />
          <Counter.Display value={quantity} />
          <Counter.Plus
            onClick={() => {
              setQuantity(quantity + 1);
            }}
            disabled={isInCart || product.stock <= quantity}
          />
        </Counter.Root>
      </Flex>

      <Spacing size={5} />

      {/* 장바구니 버튼 */}
      {(() => {
        if (cartItem) {
          return (
            <Button
              fullWidth
              color="primary"
              size="lg"
              onClick={() => {
                removeItem(product.id);
              }}
            >
              장바구니 제거
            </Button>
          );
        }

        return (
          <Button
            fullWidth
            color="primary"
            size="lg"
            onClick={() => {
              increaseQuantity(product.id, quantity);
            }}
          >
            장바구니 담기
          </Button>
        );
      })()}
    </>
  );
}

function getCategoryTagType(category: ProductCategory): TagType {
  switch (category) {
    case 'CHEESE':
      return 'cheese';
    case 'CRACKER':
      return 'cracker';
    case 'TEA':
      return 'tea';
    default:
      category satisfies never;
      throw new Error(`Invalid category: ${category}`);
  }
}
