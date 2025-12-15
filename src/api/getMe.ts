import type { GradeType } from '@/models/grade';
import { http } from '@/utils/http';

interface GetMeResponse {
  point: number;
  grade: GradeType;
}

const getMe = async () => {
  return await http.get<GetMeResponse>('/api/me');
};

export const getMeQueryOptions = () => ({
  queryKey: ['me'],
  queryFn: getMe,
});
