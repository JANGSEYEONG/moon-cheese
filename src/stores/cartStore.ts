import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { sumBy } from 'lodash';
import type { Product } from '@/domains/product/types';

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  decreaseItem: (productId: number, quantity?: number) => void;
  removeItem: (productId: number) => void;
  removeAllItems: () => void;
  getItemQuantity: (productId: number) => number;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],

        addItem: (product: Product, quantity = 1) => {
          set(state => {
            const existingItem = state.items.find(item => item.id === product.id);

            if (existingItem) {
              return {
                items: state.items.map(item =>
                  item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                ),
              };
            }

            return {
              items: [...state.items, { ...product, quantity }],
            };
          });
        },

        decreaseItem: (productId: number, quantity = 1) => {
          set(state => {
            const existingItem = state.items.find(item => item.id === productId);
            if (!existingItem) return state;

            const newQuantity = existingItem.quantity - quantity;

            if (newQuantity <= 0) {
              return {
                items: state.items.filter(item => item.id !== productId),
              };
            }

            return {
              items: state.items.map(item => (item.id === productId ? { ...item, quantity: newQuantity } : item)),
            };
          });
        },

        removeItem: (productId: number) => {
          set(state => ({
            items: state.items.filter(item => item.id !== productId),
          }));
        },

        removeAllItems: () => {
          set({ items: [] });
        },

        getItemQuantity: (productId: number) => {
          const item = get().items.find(item => item.id === productId);
          return item ? item.quantity : 0;
        },

        getTotalQuantity: () => {
          return sumBy(get().items, 'quantity');
        },

        getTotalPrice: () => {
          return sumBy(get().items, item => item.price * item.quantity);
        },
      }),
      {
        name: 'cart-storage',
      }
    )
  )
);
