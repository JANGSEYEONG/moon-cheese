import { useQuery } from '@tanstack/react-query';
import { http } from '../../utils/http';
import { queryKeys } from './queryKeys';

interface GetExchangeRateResponse {
  exchangeRate: {
    KRW: number;
    USD: number;
  };
}

export const useExchangeRate = () => {
  return useQuery({
    queryKey: queryKeys.exchangeRate(),
    queryFn: () => http.get<GetExchangeRateResponse>('/api/exchange-rate'),
  });
};
