import type { GradeType } from '@/models/grade';
import { http } from '@/utils/http';

interface GradeShipping {
  type: GradeType; // 'EXPLORER' | 'PILOT' | 'COMMANDER';
  shippingFee: number; // 배송비
  freeShippingThreshold: number; // 배송비 무료 기준 구매금액
}
interface GetGradeShippingResponse {
  gradeShippingList: GradeShipping[];
}

const getGradeShipping = async () => {
  return await http.get<GetGradeShippingResponse>('/api/grade/shipping');
};

export const getGradeShippingQueryOptions = () => ({
  queryKey: ['gradeShipping'],
  queryFn: getGradeShipping,
});
