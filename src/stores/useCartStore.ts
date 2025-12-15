import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];

  // 수량 증가 (없으면 새로 추가)
  increaseQuantity: (productId: number, amount?: number) => void;
  // 수량 감소 (0이 되면 제거)
  decreaseQuantity: (productId: number, amount?: number) => void;
  // 특정 상품 제거
  removeItem: (productId: number) => void;
  // 장바구니 비우기
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    set => ({
      cart: [],
      increaseQuantity: (productId, amount = 1) => {
        set(state => {
          const existingItem = state.cart.find(item => item.productId === productId);
          if (existingItem) {
            return {
              cart: state.cart.map(item =>
                item.productId === productId ? { ...item, quantity: item.quantity + amount } : item
              ),
            };
          }
          return {
            cart: [...state.cart, { productId, quantity: amount }],
          };
        });
      },
      decreaseQuantity: (productId, amount = 1) => {
        set(state => {
          const existingItem = state.cart.find(item => item.productId === productId);
          if (!existingItem) return state;

          const newQuantity = existingItem.quantity - amount;
          if (newQuantity <= 0) {
            return {
              cart: state.cart.filter(item => item.productId !== productId),
            };
          }
          return {
            cart: state.cart.map(item => (item.productId === productId ? { ...item, quantity: newQuantity } : item)),
          };
        });
      },
      removeItem: productId => {
        set(state => ({
          cart: state.cart.filter(item => item.productId !== productId),
        }));
      },
      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
