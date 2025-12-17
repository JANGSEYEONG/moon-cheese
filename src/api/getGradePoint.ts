import type { GradePoint } from '@/models/grade';
import { http } from '@/utils/http';
import { queryOptions } from '@tanstack/react-query';

interface GetGradePointResponse {
  gradePointList: GradePoint[];
}

const getGradePoint = async () => {
  return await http.get<GetGradePointResponse>('/api/grade/point');
};

export const getGradePointQueryOptions = () =>
  queryOptions({
    queryKey: ['gradePoint'],
    queryFn: getGradePoint,
  });
