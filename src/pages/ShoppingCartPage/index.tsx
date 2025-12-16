import { useCartStore } from '@/stores/useCartStore';
import CheckoutSection from './components/CheckoutSection';
import DeliveryMethodSection from './components/DeliveryMethodSection';
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
      <DeliveryMethodSection />
      <CheckoutSection />
    </>
  );
}

export default ShoppingCartPage;
