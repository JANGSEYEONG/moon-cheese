import { useRecentProductList } from '@/hooks/queries/useRecentProductList';
import { Flex } from 'styled-system/jsx';
import RecentPurchaseProduct from './RecentPurchaseListItem';
import { groupBy, mapValues, sumBy } from 'es-toolkit';

function RecentPurchaseList() {
  const {
    data: { recentProducts },
  } = useRecentProductList();

  const productsById = groupBy(recentProducts, product => product.id);

  const totalPricedProducts = mapValues(productsById, products => ({
    ...products[0],
    price: sumBy(products, product => product.price),
  }));

  return (
    <Flex
      css={{
        bg: 'background.01_white',
        px: 5,
        py: 4,
        gap: 4,
        rounded: '2xl',
      }}
      direction={'column'}
    >
      {Object.values(totalPricedProducts).map(recentProduct => (
        <RecentPurchaseProduct key={recentProduct.id} product={recentProduct} />
      ))}
    </Flex>
  );
}

export default RecentPurchaseList;
