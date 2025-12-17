import { getGradeShippingQueryOptions } from '@/api/getGradeShipping';
import { getMeQueryOptions } from '@/api/getMe';
import { DELIVERY_METHOD_TYPE, type GradeShipping, type GradeType, type DeliveryMethodType } from '@/models/grade';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useCartProductsTotalPrice } from './useCartProductsTotalPrice';

export function useShippingFee(): Record<DeliveryMethodType, number> {
  const [
    { data: me },
    {
      data: { gradeShippingList },
    },
  ] = useSuspenseQueries({
    queries: [getMeQueryOptions(), getGradeShippingQueryOptions()],
  });

  const totalPrice = useCartProductsTotalPrice();

  return {
    [DELIVERY_METHOD_TYPE.EXPRESS]: getExpressShippingFee(),
    [DELIVERY_METHOD_TYPE.PREMIUM]: getPremiumShippingFee(gradeShippingList, me.grade, totalPrice),
  };
}

function getExpressShippingFee() {
  return 0;
}

function getPremiumShippingFee(gradeShippingList: GradeShipping[], grade: GradeType, totalPrice: number) {
  const gradeShipping = gradeShippingList.find(gradeShipping => gradeShipping.type === grade);

  if (!gradeShipping) {
    throw new Error('Grade shipping not found');
  }

  if (gradeShipping.freeShippingThreshold <= totalPrice) {
    return 0;
  }

  return gradeShipping.shippingFee;
}
