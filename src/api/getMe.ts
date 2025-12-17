import type { GradeType } from '@/models/grade';
import { http } from '@/utils/http';
import { queryOptions } from '@tanstack/react-query';

interface GetMeResponse {
  point: number;
  grade: GradeType;
}

const getMe = async () => {
  return await http.get<GetMeResponse>('/api/me');
};

export const getMeQueryOptions = () =>
  queryOptions({
    queryKey: ['me'],
    queryFn: getMe,
  });
