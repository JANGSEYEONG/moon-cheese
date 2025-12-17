import { postProductPurchaseMutationOptions } from '@/api/postProductPurchase';
import { PriceDisplay } from '@/components/PriceDisplay';
import { DELIVERY_METHOD_TYPE, type DeliveryMethodType } from '@/models/grade';
import { useCartStore } from '@/stores/useCartStore';
import { Button, Spacing, Text } from '@/ui-lib';
import { toast } from '@/ui-lib/components/toast';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Stack, styled } from 'styled-system/jsx';
import { useCartProductsTotalPrice } from '../hooks/useCartProductsTotalPrice';
import { useShippingFee } from '../hooks/useShippingFee';
import DeliverySelect from './DeliverySelect';
import PriceSummary from './PriceSummary';

function CheckoutSection() {
  const navigate = useNavigate();

  const cart = useCartStore(state => state.cart);
  const clearCart = useCartStore(state => state.clearCart);

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<DeliveryMethodType>(
    DELIVERY_METHOD_TYPE.EXPRESS
  );

  const shippingFee = useShippingFee()[selectedDeliveryMethod];
  const totalPrice = useCartProductsTotalPrice();

  const { mutate: purchaseProducts, isPending } = useMutation({
    ...postProductPurchaseMutationOptions(),
    onSuccess: () => {
      toast.success('결제가 완료되었습니다.');
      clearCart();
      navigate('/');
    },
    onError: () => {
      toast.error('결제에 실패했습니다.');
    },
  });

  return (
    <>
      <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
        <Text variant="H2_Bold">배송 방식</Text>
        <Spacing size={4} />
        <DeliverySelect value={selectedDeliveryMethod} onChange={setSelectedDeliveryMethod} />
      </styled.section>

      <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
        <Text variant="H2_Bold">결제금액</Text>
        <Spacing size={4} />
        <Stack
          gap={6}
          css={{
            p: 5,
            border: '1px solid',
            borderColor: 'border.01_gray',
            rounded: '2xl',
          }}
        >
          <PriceSummary.Root>
            <Box gap={3}>
              <PriceSummary.Line label={`주문금액(${cart.length}개)`} value={<PriceDisplay price={totalPrice} />} />
              <Spacing size={3} />
              <PriceSummary.Line
                label="배송비"
                value={shippingFee ? <PriceDisplay price={shippingFee} /> : '무료배송'}
                highlight={shippingFee === 0}
              />
            </Box>
            <PriceSummary.Divider />
            <PriceSummary.Total label="총 금액" value={<PriceDisplay price={totalPrice + (shippingFee || 0)} />} />
          </PriceSummary.Root>

          <Button
            fullWidth
            size="lg"
            loading={isPending}
            onClick={() => {
              purchaseProducts({
                deliveryType: selectedDeliveryMethod,
                totalPrice: totalPrice + (shippingFee || 0),
                items: cart,
              });
            }}
          >
            {isPending ? '결제 중...' : '결제 진행'}
          </Button>

          <Text variant="C2_Regular" color="neutral.03_gray">
            {`우리는 신용카드, 은행 송금, 모바일 결제, 현금을 받아들입니다\n안전한 체크아웃\n귀하의 결제 정보는 암호화되어 안전합니다.`}
          </Text>
        </Stack>
      </styled.section>
    </>
  );
}

export default CheckoutSection;
