import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { CURRENCY_TYPE, type CurrencyType } from '@/constants/currency';

interface CurrencyStore {
  selectedCurrency: CurrencyType;
  exchangeRates: {
    KRW: number;
    USD: number;
  } | null;
  setSelectedCurrency: (currency: CurrencyType) => void;
  setExchangeRates: (rates: { KRW: number; USD: number }) => void;
}

export const useCurrencyStore = create<CurrencyStore>()(
  devtools(
    persist(
      set => ({
        selectedCurrency: CURRENCY_TYPE.USD,
        exchangeRates: null,
        setSelectedCurrency: currency => set({ selectedCurrency: currency }),
        setExchangeRates: rates => set({ exchangeRates: rates }),
      }),
      {
        name: 'currency-storage',
      }
    ),
    {
      name: 'currency-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);
