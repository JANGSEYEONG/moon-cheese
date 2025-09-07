import { useCurrencyStore } from '@/stores/currencyStore';
import { CURRENCY_TYPE, type CurrencyType } from '@/constants/currency';

const CURRENCY_FORMATTERS: Record<CurrencyType, Intl.NumberFormat> = {
  [CURRENCY_TYPE.USD]: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }),
  [CURRENCY_TYPE.KRW]: new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }),
} as const;

interface PriceDisplayProps {
  price: number;
}

function PriceDisplay({ price }: PriceDisplayProps) {
  const { selectedCurrency, exchangeRates } = useCurrencyStore();

  // 가격 변환 - exchangeRates에서 해당 통화의 비율 가져오기
  const rate = exchangeRates?.[selectedCurrency] ?? 1;
  const convertedPrice = price * rate;

  // formatter 가져오기
  const formatter = CURRENCY_FORMATTERS[selectedCurrency];

  // 통화별 포맷팅
  return formatter.format(convertedPrice);
}

export default PriceDisplay;
