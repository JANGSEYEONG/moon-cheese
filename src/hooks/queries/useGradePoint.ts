import { useSuspenseQuery } from '@tanstack/react-query';
import { http } from '@/utils/http';
import { queryKeys } from './queryKeys';
import type { Grade } from '@/domains/grade';

interface GetGradePointResponse {
  gradePointList: {
    type: Grade;
    minPoint: number;
  }[];
}

export const useGradePoint = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.gradePoint.all(),
    queryFn: () => http.get<GetGradePointResponse>('/api/grade/point'),
  });
};
