import { getGradeShippingQueryOptions } from '@/api/getGradeShipping';
import { getMeQueryOptions } from '@/api/getMe';
import { DELIVERY_METHOD_TYPE, type DeliveryMethodType, type GradeShipping, type GradeType } from '@/models/grade';
import { useSuspenseQueries } from '@tanstack/react-query';

interface UseShippingFeeParams {
  totalPrice: number;
}
export function useShippingFee({ totalPrice }: UseShippingFeeParams): Record<DeliveryMethodType, number> {
  const [
    { data: me },
    {
      data: { gradeShippingList },
    },
  ] = useSuspenseQueries({
    queries: [getMeQueryOptions(), getGradeShippingQueryOptions()],
  });

  return {
    [DELIVERY_METHOD_TYPE.EXPRESS]: 0,
    [DELIVERY_METHOD_TYPE.PREMIUM]: getPremiumShippingFee({ grade: me.grade, totalPrice, gradeShippingList }),
  };
}

function getPremiumShippingFee({
  grade,
  totalPrice,
  gradeShippingList,
}: {
  grade: GradeType;
  totalPrice: number;
  gradeShippingList: GradeShipping[];
}) {
  const gradeShipping = gradeShippingList.find(gradeShipping => gradeShipping.type === grade);

  if (!gradeShipping) {
    throw new Error('Grade shipping not found');
  }

  if (gradeShipping.freeShippingThreshold <= totalPrice) {
    return 0;
  }

  return gradeShipping.shippingFee;
}
