import { Spacing } from '@/ui-lib';
import RecommendationSection from './components/RecommendationSection';
import { useParams } from 'react-router';
import AsyncBoundaryWithQuery from '@/components/AsyncBoundaryWithQuery';
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
      <AsyncBoundaryWithQuery>
        <ProductDetailContent id={productId} />
      </AsyncBoundaryWithQuery>
      <Spacing size={2.5} />
      <AsyncBoundaryWithQuery>
        <RecommendationSection targetProductId={productId} />
      </AsyncBoundaryWithQuery>
    </>
  );
}

export default ProductDetailPage;
