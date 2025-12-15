import { getGradePointQueryOptions } from '@/api/getGradePoint';
import { getMeQueryOptions } from '@/api/getMe';
import { GRADE_TYPE, type GradeType } from '@/models/grade';
import { ProgressBar, Spacing, Text } from '@/ui-lib';
import { useSuspenseQueries } from '@tanstack/react-query';
import { clamp, sortBy } from 'es-toolkit';
import { Box, Flex, styled } from 'styled-system/jsx';

function CurrentLevelSection() {
  const [
    { data: me },
    {
      data: { gradePointList },
    },
  ] = useSuspenseQueries({ queries: [getMeQueryOptions(), getGradePointQueryOptions()] });

  const sortedGradePointList = sortBy(gradePointList, ['minPoint']);

  const currentGradePoint = sortedGradePointList.find(gradePoint => gradePoint.type === me.grade);
  const nextGradePoint = sortedGradePointList.find(gradePoint => gradePoint.minPoint > me.point);

  if (!currentGradePoint) {
    return <Text variant="H2_Bold">현재 내 등급 정보가 없어요</Text>;
  }

  const isMaxGrade = !nextGradePoint;

  const leftPointToNextGrade = !isMaxGrade ? nextGradePoint.minPoint - me.point : 0;
  const leftPercentToNextGrade = !isMaxGrade
    ? clamp((me.point - nextGradePoint.minPoint) / (nextGradePoint.minPoint - currentGradePoint.minPoint), 0, 1)
    : 1;

  return (
    <styled.section css={{ px: 5, py: 4 }}>
      <Text variant="H1_Bold">현재 등급</Text>

      <Spacing size={4} />

      <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
        <Flex flexDir="column" gap={2}>
          <Text variant="H2_Bold">{getGradeLabel(me.grade)}</Text>
          <ProgressBar value={leftPercentToNextGrade} size="xs" />

          <Flex justifyContent="space-between">
            <Box textAlign="left">
              <Text variant="C1_Bold">현재 포인트</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {me.point}p
              </Text>
            </Box>
            <Box textAlign="right">
              <Text variant="C1_Bold">다음 등급까지</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {leftPointToNextGrade}p
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </styled.section>
  );
}

export default CurrentLevelSection;

function getGradeLabel(grade: GradeType) {
  switch (grade) {
    case GRADE_TYPE.EXPLORER:
      return 'Explorer';
    case GRADE_TYPE.PILOT:
      return 'Pilot';
    case GRADE_TYPE.COMMANDER:
      return 'Commander';
    default:
      grade satisfies never;
      return '등급 정보가 없어요';
  }
}
