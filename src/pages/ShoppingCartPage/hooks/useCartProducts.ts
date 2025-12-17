import { getProductListQueryOptions } from '@/api/getProductList';
import type { Product } from '@/models/product';
import { useCartStore } from '@/stores/useCartStore';
import { useSuspenseQuery } from '@tanstack/react-query';
import { intersectionWith } from 'es-toolkit';

export function useCartProducts(): (Product & { quantity: number })[] {
  const {
    data: { products },
  } = useSuspenseQuery(getProductListQueryOptions());

  const cart = useCartStore(state => state.cart);

  const cartProducts = intersectionWith(
    products,
    cart.map(item => item.productId),
    (product, cartProductId) => product.id === cartProductId
  );

  return cartProducts.map(product => ({
    ...product,
    quantity: cart.find(item => item.productId === product.id)?.quantity ?? 0,
  }));
}
