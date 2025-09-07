import { useRecentProductList } from '@/hooks/queries/useRecentProductList';
import { Flex } from 'styled-system/jsx';
import RecentPurchaseProduct from './RecentPurchaseListItem';
import { map, groupBy, sumBy } from 'lodash';

function RecentPurchaseList() {
  const {
    data: { recentProducts },
  } = useRecentProductList();

  const groupedRecentProducts = map(groupBy(recentProducts, 'id'), products => ({
    ...products[0],
    price: sumBy(products, 'price'),
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
      {groupedRecentProducts.map(recentProduct => (
        <RecentPurchaseProduct key={recentProduct.id} product={recentProduct} />
      ))}
    </Flex>
  );
}

export default RecentPurchaseList;
