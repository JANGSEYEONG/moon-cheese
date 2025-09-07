import { useCartStore } from '@/stores/cartStore';
import React from 'react';
import { Divider, Stack } from 'styled-system/jsx';
import ShoppingCartListItem from './ShoppingCartListItem';

function ShoppingCartList() {
  const cartItems = useCartStore(state => state.items);

  return (
    <Stack
      gap={5}
      css={{
        p: 5,
        border: '1px solid',
        borderColor: 'border.01_gray',
        rounded: '2xl',
      }}
    >
      {cartItems.map((item, index) => (
        <React.Fragment key={item.id}>
          <ShoppingCartListItem product={item} />
          {index < cartItems.length - 1 && <Divider key={`div-${index}`} color="border.01_gray" />}
        </React.Fragment>
      ))}
    </Stack>
  );
}

export default ShoppingCartList;
