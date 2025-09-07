import { useGradePoint } from '@/hooks/queries/useGradePoint';
import { useMe } from '@/hooks/queries/useMe';

/** 현재 사용자의 등급 상태를 계산하는 훅  */
export const useGradeStatus = () => {
  const { data: me } = useMe();
  const { data: gradePointData } = useGradePoint();

  const { point: currentPoints, grade: currentGrade } = me;
  const gradeList = gradePointData.gradePointList;

  // 등급을 minPoint 기준으로 정렬 (오름차순)
  const sortedGrades = [...gradeList].sort((a, b) => a.minPoint - b.minPoint);

  // 다음 등급 찾기
  const currentGradeIndex = sortedGrades.findIndex(grade => grade.type === currentGrade);
  const nextGrade = sortedGrades[currentGradeIndex + 1] || null;

  // 다음 등급까지 필요한 포인트 계산
  // TODO: 부동소수점 때문에 계산 제대로 안되는 케이스 보완해야함
  const pointsToNextGrade = nextGrade ? nextGrade.minPoint - currentPoints : 0;

  // 진행률 계산 (현재 등급에서 다음 등급까지의 진행률)
  const currentGradeData = sortedGrades[currentGradeIndex];
  const progressToNextGrade = nextGrade
    ? Math.max(
        0,
        Math.min(1, (currentPoints - currentGradeData.minPoint) / (nextGrade.minPoint - currentGradeData.minPoint))
      )
    : 1; // 최고 등급인 경우 100%

  return {
    currentGrade,
    nextGrade,
    pointsToNextGrade: Math.max(0, pointsToNextGrade),
    progressToNextGrade,
    isMaxGrade: nextGrade === null,
    currentPoints,
  };
};
