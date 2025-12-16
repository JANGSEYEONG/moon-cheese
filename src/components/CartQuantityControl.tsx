import type { Product } from '@/models/product';
import { useCartStore } from '@/stores/useCartStore';
import { Counter } from '@/ui-lib';

interface CartQuantityControlProps {
  product: Product;
}

export function CartQuantityControl({ product }: CartQuantityControlProps) {
  const { cart, increaseQuantity, decreaseQuantity } = useCartStore();
  const cartItem = cart.find(item => item.productId === product.id);

  return (
    <Counter.Root
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Counter.Minus onClick={() => decreaseQuantity(product.id)} disabled={!Boolean(cartItem?.quantity)} />
      <Counter.Display value={cartItem?.quantity ?? 0} />
      <Counter.Plus
        onClick={() => increaseQuantity(product.id)}
        disabled={product.stock <= (cartItem?.quantity ?? 0)}
      />
    </Counter.Root>
  );
}
