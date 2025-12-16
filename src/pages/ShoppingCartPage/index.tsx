import { useCartStore } from '@/stores/useCartStore';
import CheckoutSection from './components/CheckoutSection';
import DeliveryMethodSection from './components/DeliveryMethodSection';
import ShoppingCartSection from './components/ShoppingCartSection';
import EmptyCartSection from './components/EmptyCartSection';

function ShoppingCartPage() {
  const cart = useCartStore(state => state.cart);

  if (cart.length === 0) {
    return <EmptyCartSection />;
  }

  return (
    <>
      <ShoppingCartSection />
      <DeliveryMethodSection />
      <CheckoutSection />
    </>
  );
}

export default ShoppingCartPage;
