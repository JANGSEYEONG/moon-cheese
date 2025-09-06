import { Box, Flex, styled } from 'styled-system/jsx';
import { ProgressBar, Spacing, Text } from '@/ui-lib';
import { useGradeStatus } from '../hooks/useGradeStatus';
import { GRADE_LABEL } from '@/models/user';

function CurrentLevelSection() {
  const { currentGrade, pointsToNextGrade, progressToNextGrade, isMaxGrade, isLoading, currentPoints } =
    useGradeStatus();

  // TODO: 로딩 상태
  if (isLoading || !currentGrade) {
    return <Text>로딩중</Text>;
  }

  return (
    <styled.section css={{ px: 5, py: 4 }}>
      <Text variant="H1_Bold">현재 등급</Text>

      <Spacing size={4} />

      <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
        <Flex flexDir="column" gap={2}>
          <Text variant="H2_Bold">{GRADE_LABEL[currentGrade]}</Text>

          <ProgressBar value={progressToNextGrade} size="xs" />

          <Flex justifyContent="space-between">
            <Box textAlign="left">
              <Text variant="C1_Bold">현재 포인트</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {`${currentPoints}p`}
              </Text>
            </Box>
            <Box textAlign="right">
              <Text variant="C1_Bold">{isMaxGrade ? '🎉 최고 등급이에요!' : '다음 등급까지'}</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {isMaxGrade ? '대단한걸요?' : `${pointsToNextGrade}p`}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </styled.section>
  );
}

export default CurrentLevelSection;
