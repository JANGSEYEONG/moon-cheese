import { Spacing } from '@/ui-lib';
import ProductDetailSection from './components/ProductDetailSection';
import ProductInfoSection from './components/ProductInfoSection';
import RecommendationSection from './components/RecommendationSection';
import ThumbnailSection from './components/ThumbnailSection';
import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { getProductQueryOptions } from '@/api/getProduct';
import { useSuspenseQuery } from '@tanstack/react-query';

ProductDetailPage.loader = async function ({ params }: LoaderFunctionArgs) {
  const id = Number(params.id);

  if (isNaN(id)) {
    throw new Response(`Invalid product ID: ${params.id}`, { status: 400 });
  }

  return { id };
};

function ProductDetailPage() {
  const { id } = useLoaderData<typeof ProductDetailPage.loader>();
  const { data: product } = useSuspenseQuery(getProductQueryOptions({ id }));

  return (
    <>
      <ThumbnailSection images={product.images} />
      <ProductInfoSection product={product} />

      <Spacing size={2.5} />

      <ProductDetailSection description={product.detailDescription} />

      <Spacing size={2.5} />

      <RecommendationSection productId={product.id} />
    </>
  );
}

export default ProductDetailPage;
