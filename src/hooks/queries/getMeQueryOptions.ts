import { queryOptions } from '@tanstack/react-query';
import { http } from '../../utils/http';
import { queryKeys } from './queryKeys';
import type { Grade } from '@/domains/grade';

interface GetMeResponse {
  point: number;
  grade: Grade;
}

const getMe = async () => {
  const response = await http.get<GetMeResponse>('/api/me');
  return response;
};

export const getMeQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.me.all(),
    queryFn: () => getMe(),
  });
