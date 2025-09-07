import CheckoutSection from './components/CheckoutSection';
import DeliveryMethodSection from './components/DeliveryMethodSection';
import ShoppingCartSection from './components/ShoppingCartSection';
import { useDeliveryCharge } from './hooks/useDeliveryCharge';

function ShoppingCartPage() {
  const { selectedDeliveryMethod, changeDeliveryMethod, deliveryRateTable } = useDeliveryCharge();
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
