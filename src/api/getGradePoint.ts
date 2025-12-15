import type { GradePoint } from '@/models/grade';
import { http } from '@/utils/http';

interface GetGradePointResponse {
  gradePointList: GradePoint[];
}

const getGradePoint = async () => {
  return await http.get<GetGradePointResponse>('/api/grade/point');
};

export const getGradePointQueryOptions = () => ({
  queryKey: ['gradePoint'],
  queryFn: getGradePoint,
});
