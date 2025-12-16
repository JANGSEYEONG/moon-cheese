import type { ShippingGradeType } from '@/models/grade';
import { http } from '@/utils/http';

interface PostProductPurchaseRequest {
  deliveryType: ShippingGradeType;
  totalPrice: number;
  items: {
    productId: number;
    quantity: number;
  }[];
}

export function postProductPurchase({ deliveryType, totalPrice, items }: PostProductPurchaseRequest) {
  return http.post<PostProductPurchaseRequest, null>('/api/product/purchase', {
    deliveryType,
    totalPrice,
    items,
  });
}
