import { http } from '@/utils/http';

import type { Grade } from '@/domains/grade';
import { useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';

interface GetGradeShippingResponse {
  gradeShippingList: {
    type: Grade;
    shippingFee: number; // 배송비
    freeShippingThreshold: number; // 배송비 무료 기준 구매금액
  }[];
}

export function useGradeShipping() {
  return useSuspenseQuery({
    queryKey: queryKeys.gradeShipping.all(),
    queryFn: () => http.get<GetGradeShippingResponse>('/api/grade/point'),
  });
}
