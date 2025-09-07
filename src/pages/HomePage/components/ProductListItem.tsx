import { Counter } from '@/ui-lib';
import ProductItem from './ProductItem';
import PriceDisplay from '@/components/PriceDisplay';

import type { Product } from '@/domains/product';
import { useCartStore } from '@/stores/cartStore';

interface ProductListItemProps {
  product: Product;
  onClick: (productId: number) => void;
}

function ProductListItem({ product, onClick }: ProductListItemProps) {
  const { id, name, stock, images, description, rating, price, isCaffeineFree, isGlutenFree } = product;

  const { addItem, decreaseItem, getItemQuantity } = useCartStore();
  const cartQuantity = getItemQuantity(id);

  const canDecreaseQuantity = cartQuantity > 0;
  const canIncreaseQuantity = cartQuantity < stock;

  const decreaseQuantity = () => {
    decreaseItem(id);
  };

  const increaseQuantity = () => {
    addItem(product);
  };

  return (
    <ProductItem.Root onClick={() => onClick(id)}>
      <ProductItem.Image src={images[0]} alt={name} />
      <ProductItem.Info title={name} description={description} />
      <ProductItem.Meta>
        <ProductItem.MetaLeft>
          <ProductItem.Rating rating={rating} />
          <ProductItem.Price>
            <PriceDisplay price={price} />
          </ProductItem.Price>
        </ProductItem.MetaLeft>
        {isCaffeineFree && <ProductItem.FreeTag type="gluten" />}
        {isGlutenFree && <ProductItem.FreeTag type="caffeine" />}
      </ProductItem.Meta>
      <Counter.Root>
        <Counter.Minus onClick={decreaseQuantity} disabled={!canDecreaseQuantity} />
        <Counter.Display value={cartQuantity} />
        <Counter.Plus onClick={increaseQuantity} disabled={!canIncreaseQuantity} />
      </Counter.Root>
    </ProductItem.Root>
  );
}

export default ProductListItem;
