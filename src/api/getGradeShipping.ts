import type { GradeShipping } from '@/models/grade';
import { http } from '@/utils/http';
import { queryOptions } from '@tanstack/react-query';

interface GetGradeShippingResponse {
  gradeShippingList: GradeShipping[];
}

const getGradeShipping = async () => {
  return await http.get<GetGradeShippingResponse>('/api/grade/shipping');
};

export const getGradeShippingQueryOptions = () =>
  queryOptions({
    queryKey: ['gradeShipping'],
    queryFn: getGradeShipping,
  });
