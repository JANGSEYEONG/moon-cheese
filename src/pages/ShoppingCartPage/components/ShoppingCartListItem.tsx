import type { Product } from '@/domains/product';
import { useCartStore } from '@/stores/cartStore';
import ShoppingCartItem from './ShoppingCartItem';
import { productCategoryToTagType } from '@/utils/categoryMapper';
import PriceDisplay from '@/components/PriceDisplay';
import { Counter } from '@/ui-lib';

interface ShoppingCartListItemProps {
  product: Product;
}

function ShoppingCartListItem({ product }: ShoppingCartListItemProps) {
  const { id, name, images, category, description, price, stock } = product;

  const { getItemQuantity, addItem, decreaseItem, removeItem } = useCartStore();

  const cartQuantity = getItemQuantity(id);

  const canDecreaseQuantity = cartQuantity > 0;
  const canIncreaseQuantity = cartQuantity < stock;

  const decreaseQuantity = () => {
    decreaseItem(id);
  };

  const increaseQuantity = () => {
    addItem(product);
  };

  const removeCartItem = () => {
    removeItem(id);
  };

  return (
    <ShoppingCartItem.Root>
      <ShoppingCartItem.Image src={images[0]} alt={name} />
      <ShoppingCartItem.Content>
        <ShoppingCartItem.Info
          type={productCategoryToTagType(category)}
          title={name}
          description={description}
          onDelete={removeCartItem}
        />
        <ShoppingCartItem.Footer>
          <ShoppingCartItem.Price>
            <PriceDisplay price={price} />
          </ShoppingCartItem.Price>
          <Counter.Root>
            <Counter.Minus onClick={decreaseQuantity} disabled={!canDecreaseQuantity} />
            <Counter.Display value={cartQuantity} />
            <Counter.Plus onClick={increaseQuantity} disabled={!canIncreaseQuantity} />
          </Counter.Root>
        </ShoppingCartItem.Footer>
      </ShoppingCartItem.Content>
    </ShoppingCartItem.Root>
  );
}

export default ShoppingCartListItem;
