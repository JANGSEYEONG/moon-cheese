import { Spacing } from '@/ui-lib';
import ProductInfoSection from './ProductInfoSection';
import ThumbnailSection from './ThumbnailSection';
import ProductDetailSection from './ProductDetailSection';
import { useProductById } from '@/hooks/queries/useProductById';

interface ProductDetailContentProps {
  id: number;
}

function ProductDetailContent({ id }: ProductDetailContentProps) {
  const { data: product } = useProductById(id);

  const { images, detailDescription } = product;

  return (
    <>
      <ThumbnailSection images={images} />
      <ProductInfoSection key={product.id} product={product} />

      <Spacing size={2.5} />

      <ProductDetailSection description={detailDescription} />
    </>
  );
}

export default ProductDetailContent;
