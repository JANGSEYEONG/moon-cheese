import { useCartStore } from '@/stores/useCartStore';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import Badge from '@/ui-lib/components/badge';
import CurrencyToggle from '@/ui-lib/components/currency-toggle';
import { ArrowLeftIcon, ShoppingCartIcon } from '@/ui-lib/components/icons';
import Logo from '@/ui-lib/components/logo';
import { Link, useLocation, useNavigate } from 'react-router';
import { Flex, styled } from 'styled-system/jsx';
import { flex } from 'styled-system/patterns';

export function Header() {
  const location = useLocation();
  const isRootRoute = location.pathname === '/';

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
        <ChangeCurrencyButton />
        <ShoppingCartButton />
      </Flex>
    </styled.header>
  );
}

function ChangeCurrencyButton() {
  const { currency, setCurrency } = useCurrencyStore();
  return <CurrencyToggle value={currency} onValueChange={setCurrency} />;
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
  const cartItems = useCartStore(state => state.cart);
  return (
    <Link to="/shopping-cart">
      <Badge content={cartItems.length} size="sm">
        <ShoppingCartIcon size={22} />
      </Badge>
    </Link>
  );
}
