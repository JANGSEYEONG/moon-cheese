import { useMutation } from '@tanstack/react-query';
import { http } from '@/utils/http';
import type { DeliveryMethod } from '@/domains/delivery';

interface PostProductPurchaseRequest {
  deliveryType: DeliveryMethod;
  totalPrice: number;
  items: {
    productId: number;
    quantity: number;
  }[];
}

export function useProductPurchase() {
  return useMutation({
    mutationFn: (data: PostProductPurchaseRequest) => {
      return http.post<PostProductPurchaseRequest, null>('/api/product/purchase', data);
    },
  });
}
