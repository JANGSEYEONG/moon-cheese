import { http } from '@/utils/http';

interface GetGradePointResponse {
  gradePointList: {
    type: 'EXPLORER' | 'PILOT' | 'COMMANDER';
    minPoint: number;
  }[];
}

const getGradePoint = async () => {
  return await http.get<GetGradePointResponse>('/api/grade/point');
};

export const getGradePointQueryOptions = () => ({
  queryKey: ['gradePoint'],
  queryFn: getGradePoint,
});
