import { Spacing } from '@/ui-lib';
import ProductDetailSection from './components/ProductDetailSection';
import ProductInfoSection from './components/ProductInfoSection';
import RecommendationSection from './components/RecommendationSection';
import ThumbnailSection from './components/ThumbnailSection';
import { useParams } from 'react-router';
import { useProductById } from '@/hooks/queries/useProductById';
function ProductDetailPage() {
  const { id: paramId } = useParams();

  // TODO: number 결과가 숫자가 아니거나 null, undeifned이면 에러처리
  const productId = Number(paramId);

  const { data: product } = useProductById(Number(productId));

  const { images, detailDescription } = product;

  return (
    <>
      <ThumbnailSection images={images} />
      <ProductInfoSection product={product} />

      <Spacing size={2.5} />

      <ProductDetailSection description={detailDescription} />

      <Spacing size={2.5} />

      <RecommendationSection />
    </>
  );
}

export default ProductDetailPage;
