import { useQuery } from '@tanstack/react-query';
import { http } from '../../utils/http';
import { queryKeys } from './queryKeys';
import type { Grade } from '@/models/user';

interface GetMeResponse {
  point: number;
  grade: Grade;
}

export const useMe = () => {
  return useQuery({
    queryKey: queryKeys.me(),
    queryFn: () => http.get<GetMeResponse>('/api/me'),
  });
};
