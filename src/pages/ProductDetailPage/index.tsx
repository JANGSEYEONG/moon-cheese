import { Spacing } from '@/ui-lib';
import RecommendationSection from './components/RecommendationSection';
import { useParams } from 'react-router';
import AsyncBoundary from '@/components/AsyncBoundary';
import ProductDetailContent from './components/ProductDetailContent';
import InvalidPageSection from '@/components/InvalidPageSection';

function ProductDetailPage() {
  const { id: paramId } = useParams();

  const productId = Number(paramId);

  if (!paramId || isNaN(productId) || productId <= 0) {
    return <InvalidPageSection />;
  }

  return (
    <>
      <AsyncBoundary>
        <ProductDetailContent id={productId} />
      </AsyncBoundary>
      <Spacing size={2.5} />
      <AsyncBoundary>
        <RecommendationSection targetProductId={productId} />
      </AsyncBoundary>
    </>
  );
}

export default ProductDetailPage;
