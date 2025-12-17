import type { DeliveryMethodType } from '@/models/grade';
import { http } from '@/utils/http';
import { mutationOptions } from '@tanstack/react-query';

interface PostProductPurchaseRequest {
  deliveryType: DeliveryMethodType;
  totalPrice: number;
  items: {
    productId: number;
    quantity: number;
  }[];
}
const postProductPurchase = async ({ deliveryType, totalPrice, items }: PostProductPurchaseRequest) => {
  return http.post<PostProductPurchaseRequest, null>('/api/product/purchase', {
    deliveryType,
    totalPrice,
    items,
  });
};

export const postProductPurchaseMutationOptions = () =>
  mutationOptions({
    mutationKey: ['productPurchase'],
    mutationFn: postProductPurchase,
  });
