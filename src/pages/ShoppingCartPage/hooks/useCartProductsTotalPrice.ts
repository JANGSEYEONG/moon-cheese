import { getProductListQueryOptions } from '@/api/getProductList';
import { useCartStore } from '@/stores/useCartStore';
import { useSuspenseQuery } from '@tanstack/react-query';
import { intersectionWith, sumBy } from 'es-toolkit';

export function useCartProductsTotalPrice(): number {
  const {
    data: { products },
  } = useSuspenseQuery(getProductListQueryOptions());

  const cart = useCartStore(state => state.cart);
  const cartProductIds = cart.map(item => item.productId);

  const cartProducts = intersectionWith(
    products,
    cartProductIds,
    (product, cartProductId) => product.id === cartProductId
  );

  const totalPrice = sumBy(cartProducts, product => {
    const cartItem = cart.find(item => item.productId === product.id);
    if (!cartItem) {
      return 0;
    }
    return product.price * cartItem.quantity;
  });

  return totalPrice;
}
