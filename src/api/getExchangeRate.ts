import { http } from '@/utils/http';

interface GetExchangeRateResponse {
  exchangeRate: {
    KRW: number;
    USD: number;
  };
}

const getExchangeRate = async () => {
  return await http.get<GetExchangeRateResponse>('/api/exchange-rate');
};

export const getExchangeRateQueryOptions = () => ({
  queryKey: ['exchangeRate'],
  queryFn: getExchangeRate,
});
