import PriceDisplay from '@/components/PriceDisplay';
import { SECOND } from '@/constants/time';
import type { DeliveryMethod } from '@/domains/delivery';
import { useProductPurchase } from '@/hooks/queries/useProductPurchase';
import { useCartStore } from '@/stores/cartStore';
import { Button, Spacing, Text } from '@/ui-lib';
import { toast } from '@/ui-lib/components/toast';
import { delay } from '@/utils/async';
import { useNavigate } from 'react-router';
import { Box, Divider, Flex, HStack, Stack, styled } from 'styled-system/jsx';

interface CheckoutSectionProps {
  selectedDeliveryMethod: DeliveryMethod;

  finalDeliveryCharge: number;
}
function CheckoutSection({ selectedDeliveryMethod, finalDeliveryCharge }: CheckoutSectionProps) {
  const navigate = useNavigate();

  const { items: cartItems, getTotalPrice, getTotalQuantity, removeAllItems } = useCartStore();

  const totalProductPrice = getTotalPrice();
  const totalProductQuantity = getTotalQuantity();

  const finalPrice = totalProductPrice + finalDeliveryCharge;

  const { mutateAsync, isPending } = useProductPurchase();
  const onClickPurchase = async () => {
    const orderItems = cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    try {
      await mutateAsync({
        deliveryType: selectedDeliveryMethod,
        totalPrice: finalPrice,
        items: orderItems,
      });
      toast.success('결제가 완료되었습니다.');

      removeAllItems();
      await delay(SECOND * 2);
      navigate('/');
    } catch {
      toast.error('결제 중 오류가 발생했습니다.', '다시 시도해 주세요.');
    }
  };

  return (
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
        <Stack gap={5}>
          <Box gap={3}>
            <Flex justify="space-between">
              <Text variant="B2_Regular">{`주문금액(${totalProductQuantity}개)`}</Text>
              <Text variant="B2_Bold">
                <PriceDisplay price={totalProductPrice} />
              </Text>
            </Flex>
            <Spacing size={3} />
            <Flex justify="space-between">
              <Text variant="B2_Regular">배송비</Text>
              <Text variant="B2_Bold" color="state.green">
                {finalDeliveryCharge ? <PriceDisplay price={finalDeliveryCharge} /> : '무료배송'}
              </Text>
            </Flex>
          </Box>

          <Divider color="border.01_gray" />

          <HStack justify="space-between">
            <Text variant="H2_Bold">총 금액</Text>
            <Text variant="H2_Bold">
              <PriceDisplay price={finalPrice} />
            </Text>
          </HStack>
        </Stack>

        <Button fullWidth size="lg" loading={isPending} onClick={onClickPurchase}>
          {isPending ? '결제 중...' : '결제 진행'}
        </Button>

        <Text variant="C2_Regular" color="neutral.03_gray">
          {`우리는 신용카드, 은행 송금, 모바일 결제, 현금을 받아들입니다\n안전한 체크아웃\n귀하의 결제 정보는 암호화되어 안전합니다.`}
        </Text>
      </Stack>
    </styled.section>
  );
}

export default CheckoutSection;
