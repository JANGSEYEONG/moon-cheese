import { useCurrencyStore } from '@/stores/currencyStore';
import { CURRENCY_TYPE, type CurrencyType } from '@/models/common';

const CURRENCY_CONFIG: Record<CurrencyType, { locale: Intl.LocalesArgument }> = {
  [CURRENCY_TYPE.USD]: {
    locale: 'en-US',
  },
  [CURRENCY_TYPE.KRW]: {
    locale: 'ko-KR',
  },
} as const;

interface PriceDisplayProps {
  price: number;
}

function PriceDisplay({ price }: PriceDisplayProps) {
  const { selectedCurrency, exchangeRates } = useCurrencyStore();

  const convertAndFormatPrice = () => {
    // 가격 변환 - exchangeRates에서 해당 통화의 비율 가져오기
    const rate = exchangeRates?.[selectedCurrency] ?? 1;
    const convertedPrice = price * rate;

    // 설정 가져오기
    const config = CURRENCY_CONFIG[selectedCurrency];

    // 통화별 포맷팅
    return convertedPrice.toLocaleString(config.locale, {
      style: 'currency',
      currency: selectedCurrency,
    });
  };

  return convertAndFormatPrice();
}

export default PriceDisplay;
