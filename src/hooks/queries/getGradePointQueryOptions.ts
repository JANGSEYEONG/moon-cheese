import { queryOptions } from '@tanstack/react-query';
import { http } from '@/utils/http';
import { queryKeys } from './queryKeys';
import type { Grade } from '@/domains/grade';

export interface GetGradePointResponse {
  gradePointList: {
    type: Grade;
    minPoint: number;
  }[];
}

const getGradePoint = async () => {
  const response = await http.get<GetGradePointResponse>('/api/grade/point');
  return response;
};

export const getGradePointQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.gradePoint.all(),
    queryFn: () => getGradePoint(),
  });
