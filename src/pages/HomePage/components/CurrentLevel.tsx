import { Box, Flex } from 'styled-system/jsx';
import { ProgressBar, Text } from '@/ui-lib';
import { GRADE_LABEL } from '@/domains/grade';
import { getMeQueryOptions } from '@/hooks/queries/getMeQueryOptions';
import { useSuspenseQueries } from '@tanstack/react-query';
import { getGradePointQueryOptions, type GetGradePointResponse } from '@/hooks/queries/getGradePointQueryOptions';
import { keyBy, sortBy } from 'es-toolkit';

function CurrentLevel() {
  const [{ data: me }, { data: sortedGradePoints }] = useSuspenseQueries({
    queries: [
      getMeQueryOptions(),
      {
        ...getGradePointQueryOptions(),
        select: (data: GetGradePointResponse) => sortBy(data.gradePointList, ['minPoint']),
      },
    ],
  });

  const currentGrade = me.grade;
  const currentPoint = me.point;

  const nextGrade = sortedGradePoints.find(grade => grade.minPoint > currentPoint) || null;

  const isMaxGrade = nextGrade === null;

  //(현재포인트 - 현재등급 최소포인트) / (다음등급 최소포인트 - 현재등급 최소포인트)
  const currentGradeInfo = keyBy(sortedGradePoints, grade => grade.type)[me.grade];

  const progressToNextGrade = !isMaxGrade
    ? (currentPoint - currentGradeInfo.minPoint) / (nextGrade.minPoint - currentGradeInfo.minPoint)
    : 1;

  const pointsToNextGrade = !isMaxGrade ? nextGrade.minPoint - currentPoint : 0;

  return (
    <Flex flexDir="column" gap={2}>
      <Text variant="H2_Bold">{GRADE_LABEL[currentGrade]}</Text>

      <ProgressBar value={progressToNextGrade} size="xs" />

      <Flex justifyContent="space-between">
        <Box textAlign="left">
          <Text variant="C1_Bold">현재 포인트</Text>
          <Text variant="C2_Regular" color="neutral.03_gray">
            {`${currentPoint.toFixed()}p`}
          </Text>
        </Box>
        <Box textAlign="right">
          <Text variant="C1_Bold">{isMaxGrade ? '🎉 최고 등급이에요!' : '다음 등급까지'}</Text>
          <Text variant="C2_Regular" color="neutral.03_gray">
            {isMaxGrade ? '대단한걸요?' : `${pointsToNextGrade.toFixed()}p`}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default CurrentLevel;
