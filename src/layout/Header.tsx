import Badge from '@/ui-lib/components/badge';
import CurrencyToggle from '@/ui-lib/components/currency-toggle';
import { ArrowLeftIcon, ShoppingCartIcon } from '@/ui-lib/components/icons';
import Logo from '@/ui-lib/components/logo';
import { useLocation, useNavigate } from 'react-router';
import { Flex, styled } from 'styled-system/jsx';
import { flex } from 'styled-system/patterns';
import { useCurrencyStore } from '@/stores/currencyStore';
import { useExchangeRate } from '@/hooks/queries/useExchangeRate';
import { useEffect } from 'react';
import type { CurrencyType } from '@/ui-lib';
import { useCartStore } from '@/stores/cartStore';

// TODO: 환율 갱신 시점 기획 확인 후 적용 필요
export function Header() {
  const { selectedCurrency, setSelectedCurrency, setExchangeRates } = useCurrencyStore();
  const { data: exchangeRateData } = useExchangeRate();
  const location = useLocation();

  const isRootRoute = location.pathname === '/';

  useEffect(() => {
    if (exchangeRateData?.exchangeRate) {
      setExchangeRates(exchangeRateData.exchangeRate);
    }
  }, [exchangeRateData, setExchangeRates]);

  const handleCurrencyChange = (currency: CurrencyType) => {
    setSelectedCurrency(currency);
  };

  return (
    <styled.header
      className={flex({
        pos: 'sticky',
        top: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        h: 14,
        px: 5,
        zIndex: 'docked',
        bg: 'background.01_white',
      })}
    >
      {isRootRoute ? <Logo /> : <BackButton />}
      <Flex alignItems="center" gap={4}>
        <CurrencyToggle value={selectedCurrency} onValueChange={handleCurrencyChange} />
        <ShoppingCartButton />
      </Flex>
    </styled.header>
  );
}

function BackButton() {
  const navigate = useNavigate();

  return (
    <styled.button onClick={() => navigate(-1)} color="neutral.01_black">
      <ArrowLeftIcon />
    </styled.button>
  );
}

function ShoppingCartButton() {
  const navigate = useNavigate();
  const { getTotalQuantity } = useCartStore();
  const totalQuantity = getTotalQuantity();
  return (
    <Badge content={totalQuantity} size="sm" cursor="pointer" onClick={() => navigate('/shopping-cart')}>
      <ShoppingCartIcon size={22} />
    </Badge>
  );
}
