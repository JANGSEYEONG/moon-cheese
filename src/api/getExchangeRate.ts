import { http } from '@/utils/http';
import { queryOptions } from '@tanstack/react-query';
interface GetExchangeRateResponse {
  exchangeRate: {
    KRW: number;
    USD: number;
  };
}

const getExchangeRate = async () => {
  return await http.get<GetExchangeRateResponse>('/api/exchange-rate');
};

export const getExchangeRateQueryOptions = () =>
  queryOptions({
    queryKey: ['exchangeRate'],
    queryFn: getExchangeRate,
  });
