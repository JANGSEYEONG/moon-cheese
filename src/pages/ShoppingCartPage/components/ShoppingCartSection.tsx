import { CartQuantityControl } from '@/components/CartQuantityControl';
import { PriceDisplay } from '@/components/PriceDisplay';
import { Separated } from '@/components/Separated';
import type { Product } from '@/models/product';
import { useCartStore } from '@/stores/useCartStore';
import { Button, Spacing, Text } from '@/ui-lib';
import { Divider, Flex, Stack, styled } from 'styled-system/jsx';
import { useCartProducts } from '../hooks/useCartProducts';
import ShoppingCartItem from './ShoppingCartItem';

function ShoppingCartSection() {
  const cartProducts = useCartProducts();
  const clearCart = useCartStore(state => state.clearCart);

  return (
    <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
      <Flex justify="space-between">
        <Text variant="H2_Bold">장바구니</Text>
        <Button color={'neutral'} size="sm" onClick={() => clearCart()}>
          전체삭제
        </Button>
      </Flex>
      <Spacing size={4} />
      <Stack
        gap={5}
        css={{
          p: 5,
          border: '1px solid',
          borderColor: 'border.01_gray',
          rounded: '2xl',
        }}
      >
        <Separated by={<Divider color="border.01_gray" />}>
          {cartProducts.map(product => (
            <CartProductItem key={product.id} product={product} />
          ))}
        </Separated>
      </Stack>
    </styled.section>
  );
}

export default ShoppingCartSection;

function CartProductItem({ product }: { product: Product }) {
  const { removeItem } = useCartStore();

  return (
    <ShoppingCartItem.Root>
      <ShoppingCartItem.Image src={product.images[0]} alt={product.name} />
      <ShoppingCartItem.Content>
        <ShoppingCartItem.Info
          category={product.category}
          title={product.name}
          description={product.description}
          onDelete={() => removeItem(product.id)}
        />
        <ShoppingCartItem.Footer>
          <ShoppingCartItem.Price>
            <PriceDisplay price={product.price} />
          </ShoppingCartItem.Price>

          <CartQuantityControl product={product} />
        </ShoppingCartItem.Footer>
      </ShoppingCartItem.Content>
    </ShoppingCartItem.Root>
  );
}
