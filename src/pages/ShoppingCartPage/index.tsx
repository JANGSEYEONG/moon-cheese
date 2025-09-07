import { useCartStore } from '@/stores/cartStore';
import CheckoutSection from './components/CheckoutSection';
import DeliveryMethodSection from './components/DeliveryMethodSection';
import ShoppingCartSection from './components/ShoppingCartSection';
import { useDeliveryCharge } from './hooks/useDeliveryCharge';
import EmptyCartSection from './components/EmptyCartSection';

function ShoppingCartPage() {
  const isCartEmpty = useCartStore(state => state.items.length <= 0);
  const { selectedDeliveryMethod, changeDeliveryMethod, deliveryRateTable } = useDeliveryCharge();

  if (isCartEmpty) return <EmptyCartSection />;

  return (
    <>
      <ShoppingCartSection />
      <DeliveryMethodSection
        selectedDeliveryMethod={selectedDeliveryMethod}
        changeDeliveryMethod={changeDeliveryMethod}
        deliveryRateTable={deliveryRateTable}
      />
      <CheckoutSection finalDeliveryCharge={deliveryRateTable[selectedDeliveryMethod]} />
    </>
  );
}

export default ShoppingCartPage;
