import { DELIVERY_METHOD, DELIVERY_POLICY, type DeliveryMethod } from '@/domains/delivery';
import { useMe } from '@/hooks/queries/useMe';
import { useCartStore } from '@/stores/cartStore';
import { useState, useMemo } from 'react';

interface UseDeliveryChargeReturns {
  selectedDeliveryMethod: DeliveryMethod;
  deliveryRateTable: Record<DeliveryMethod, number>;
  changeDeliveryMethod: (method: DeliveryMethod) => void;
}

export function useDeliveryCharge(): UseDeliveryChargeReturns {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<DeliveryMethod>(DELIVERY_METHOD.EXPRESS);
  const { data: user } = useMe();
  const totalPrice = useCartStore(state => state.getTotalPrice());

  const calculateDeliveryCharge = (method: DeliveryMethod): number => {
    if (!user) return 0;

    const policy = DELIVERY_POLICY[method];
    const chargeConfig = policy.gradeCharges[user.grade];

    if (chargeConfig.freeThreshold && totalPrice >= chargeConfig.freeThreshold) {
      return 0;
    }

    return chargeConfig.baseCharge;
  };

  const deliveryRateTable = useMemo(() => {
    if (!user) return {} as Record<DeliveryMethod, number>;

    return Object.values(DELIVERY_METHOD).reduce(
      (acc, method) => {
        acc[method] = calculateDeliveryCharge(method);
        return acc;
      },
      {} as Record<DeliveryMethod, number>
    );
  }, [user?.grade, totalPrice]);

  const changeDeliveryMethod = (method: DeliveryMethod) => {
    setSelectedDeliveryMethod(method);
  };

  return {
    selectedDeliveryMethod,
    deliveryRateTable,
    changeDeliveryMethod,
  };
}
