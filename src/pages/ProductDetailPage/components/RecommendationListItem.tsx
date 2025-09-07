import type { Product } from '@/domains/product';
import RecommendationProductItem from './RecommendationProductItem';
import PriceDisplay from '@/components/PriceDisplay';

interface RecommendationListItemProps {
  product: Product;
  onClick: (productId: number) => void;
}
function RecommendationListItem({ product, onClick }: RecommendationListItemProps) {
  const { id, images, name, rating, price } = product;
  return (
    <RecommendationProductItem.Root onClick={() => onClick(id)}>
      <RecommendationProductItem.Image src={images[0]} alt={name} />
      <RecommendationProductItem.Info name={name} rating={rating} />
      <RecommendationProductItem.Price>
        <PriceDisplay price={price} />
      </RecommendationProductItem.Price>
    </RecommendationProductItem.Root>
  );
}

export default RecommendationListItem;
