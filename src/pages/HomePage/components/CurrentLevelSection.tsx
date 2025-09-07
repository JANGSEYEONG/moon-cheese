import { Box, styled } from 'styled-system/jsx';
import { Spacing, Text } from '@/ui-lib';
import CurrentLevel from './CurrentLevel';
import AsyncBoundary from '@/components/AsyncBoundary';

function CurrentLevelSection() {
  return (
    <styled.section css={{ px: 5, py: 4 }}>
      <Text variant="H1_Bold">현재 등급</Text>
      <Spacing size={4} />
      <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
        <AsyncBoundary>
          <CurrentLevel />
        </AsyncBoundary>
      </Box>
    </styled.section>
  );
}

export default CurrentLevelSection;
