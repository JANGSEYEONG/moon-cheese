import { styled } from 'styled-system/jsx';
import { Spacing, Text } from '@/ui-lib';
import RecentPurchaseList from './RecentPurchaseList';
import AsyncBoundaryWithQuery from '@/components/AsyncBoundaryWithQuery';

function RecentPurchaseSection() {
  return (
    <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
      <Text variant="H1_Bold">최근 구매한 상품</Text>
      <Spacing size={4} />
      <AsyncBoundaryWithQuery>
        <RecentPurchaseList />
      </AsyncBoundaryWithQuery>
    </styled.section>
  );
}

export default RecentPurchaseSection;
