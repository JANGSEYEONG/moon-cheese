import { styled } from 'styled-system/jsx';
import { Spacing, Text } from '@/ui-lib';
import AsyncBoundary from '@/components/AsyncBoundary';
import RecentPurchaseList from './RecentPurchaseList';

function RecentPurchaseSection() {
  return (
    <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
      <Text variant="H1_Bold">최근 구매한 상품</Text>
      <Spacing size={4} />
      <AsyncBoundary>
        <RecentPurchaseList />
      </AsyncBoundary>
    </styled.section>
  );
}

export default RecentPurchaseSection;
