import { useCurrencyStore } from '@/stores/currencyStore';
import { useExchangeRate } from './queries/useExchangeRate';
import { useEffect } from 'react';
import type { CurrencyType } from '@/constants/currency';

// TODO: 환율 갱신 시점 기획 확인 후 적용 필요
export function useCurrency() {
  const { selectedCurrency, setSelectedCurrency, setExchangeRates } = useCurrencyStore();

  const { data: exchangeRateData } = useExchangeRate();

  const changeCurrency = (currency: CurrencyType) => {
    setSelectedCurrency(currency);
  };

  useEffect(() => {
    if (exchangeRateData?.exchangeRate) {
      setExchangeRates(exchangeRateData.exchangeRate);
    }
  }, [exchangeRateData, setExchangeRates]);

  return {
    selectedCurrency,
    changeCurrency,
  };
}
