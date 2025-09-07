import { Spacing, Text } from '@/ui-lib';
import { styled } from 'styled-system/jsx';
import RecommendationList from './RecommendationList';

interface RecommendationSectionProps {
  targetProductId: number;
}
function RecommendationSection({ targetProductId }: RecommendationSectionProps) {
  return (
    <styled.section css={{ bg: 'background.01_white', px: 5, pt: 5, pb: 6 }}>
      <Text variant="H2_Bold">추천 제품</Text>

      <Spacing size={4} />

      <RecommendationList targetProductId={targetProductId} />
    </styled.section>
  );
}

export default RecommendationSection;
