import { create } from 'zustand';
type CurrencyType = 'USD' | 'KRW';
import { createJSONStorage, persist } from 'zustand/middleware';
interface CurrencyStore {
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    set => ({
      currency: 'USD',
      setCurrency: (currency: CurrencyType) => set({ currency }),
    }),
    {
      name: 'currency',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
