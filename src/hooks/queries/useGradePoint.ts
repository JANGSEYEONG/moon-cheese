import { useQuery } from '@tanstack/react-query';
import { http } from '../../utils/http';
import { queryKeys } from './queryKeys';
import type { Grade } from '@/models/user';

interface GetGradePointResponse {
  gradePointList: {
    type: Grade;
    minPoint: number;
  }[];
}

export const useGradePoint = () => {
  return useQuery({
    queryKey: queryKeys.gradePoint(),
    queryFn: () => http.get<GetGradePointResponse>('/api/grade/point'),
  });
};
