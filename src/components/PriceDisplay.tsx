import { getExchangeRateQueryOptions } from '@/api/getExchangeRate';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import { useSuspenseQuery } from '@tanstack/react-query';

export function PriceDisplay({ price }: { price: number }) {
  const currency = useCurrencyStore(state => state.currency);
  const {
    data: { exchangeRate },
  } = useSuspenseQuery(getExchangeRateQueryOptions());

  switch (currency) {
    case 'USD':
      return `$${price.toFixed(2).toLocaleString()}`;
    case 'KRW':
      return `${Math.round(price * exchangeRate.KRW).toLocaleString()}원`;
    default:
      currency satisfies never;
      throw new Error(`Invalid currency: ${currency}`);
  }
}
