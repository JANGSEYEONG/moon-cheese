import { useCartStore } from '@/stores/useCartStore';
import CheckoutSection from './components/CheckoutSection';
import EmptyCartSection from './components/EmptyCartSection';
import ShoppingCartSection from './components/ShoppingCartSection';

function ShoppingCartPage() {
  const cart = useCartStore(state => state.cart);

  if (cart.length === 0) {
    return <EmptyCartSection />;
  }

  return (
    <>
      <ShoppingCartSection />
      <CheckoutSection />
    </>
  );
}

export default ShoppingCartPage;
