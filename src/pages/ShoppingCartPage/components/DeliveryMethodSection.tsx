import { getGradeShippingQueryOptions } from '@/api/getGradeShipping';
import { getMeQueryOptions } from '@/api/getMe';
import { getProductListQueryOptions } from '@/api/getProductList';
import { PriceDisplay } from '@/components/PriceDisplay';
import { SHIPPING_METHOD_TYPE, type GradeShipping, type GradeType, type ShippingMethodType } from '@/models/grade';
import { useCartStore } from '@/stores/useCartStore';
import { Spacing, Text } from '@/ui-lib';
import { DeliveryIcon, RocketIcon } from '@/ui-lib/components/icons';
import { useSuspenseQueries } from '@tanstack/react-query';
import { intersectionWith, sumBy } from 'es-toolkit';
import { useState } from 'react';
import { Flex, Stack, styled } from 'styled-system/jsx';

function DeliveryMethodSection() {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<ShippingMethodType>(
    SHIPPING_METHOD_TYPE.EXPRESS
  );

  return (
    <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
      <Text variant="H2_Bold">배송 방식</Text>

      <Spacing size={4} />

      <DeliverySelect value={selectedDeliveryMethod} onChange={setSelectedDeliveryMethod} />
    </styled.section>
  );
}

interface DeliverySelectProps {
  value: ShippingMethodType;
  onChange: (value: ShippingMethodType) => void;
}
function DeliverySelect({ value, onChange }: DeliverySelectProps) {
  const shippingFee = useShippingFee();

  return (
    <Stack gap={4}>
      <DeliveryOption
        title="Express"
        description="2-3일 후 도착 예정"
        icon={<DeliveryIcon size={28} />}
        price={shippingFee[SHIPPING_METHOD_TYPE.EXPRESS]}
        isSelected={value === SHIPPING_METHOD_TYPE.EXPRESS}
        onClick={() => onChange(SHIPPING_METHOD_TYPE.EXPRESS)}
      />
      <DeliveryOption
        title="Premium"
        description="당일 배송"
        icon={<RocketIcon size={28} />}
        price={shippingFee[SHIPPING_METHOD_TYPE.PREMIUM]}
        isSelected={value === SHIPPING_METHOD_TYPE.PREMIUM}
        onClick={() => onChange(SHIPPING_METHOD_TYPE.PREMIUM)}
      />
    </Stack>
  );
}

function DeliveryOption({
  title,
  description,
  icon,
  price,
  isSelected,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  price: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <Flex
      gap={3}
      css={{
        alignItems: 'center',
        p: 5,
        py: 4,
        bgColor: isSelected ? 'primary.01_primary' : 'background.02_light-gray',
        transition: 'background-color 0.3s ease',
        rounded: '2xl',
        color: isSelected ? 'neutral.05_white' : 'neutral.01_black',
        cursor: 'pointer',
      }}
      role="button"
      onClick={onClick}
    >
      {icon}

      <Flex flexDir="column" gap={1} flex={1}>
        <Text variant="B2_Regular" fontWeight={'semibold'} color={isSelected ? 'neutral.05_white' : 'neutral.01_black'}>
          {title}
        </Text>
        <Text variant="C2_Medium" color={isSelected ? 'neutral.05_white' : 'neutral.02_gray'}>
          {description}
        </Text>
      </Flex>
      <Text variant="B2_Medium" fontWeight={'semibold'} color={isSelected ? 'neutral.05_white' : 'neutral.01_black'}>
        {price ? <PriceDisplay price={price} /> : '무료'}
      </Text>
    </Flex>
  );
}

export default DeliveryMethodSection;

function useShippingFee(): Record<ShippingMethodType, number> {
  const [
    { data: me },
    {
      data: { gradeShippingList },
    },
    {
      data: { products },
    },
  ] = useSuspenseQueries({
    queries: [getMeQueryOptions(), getGradeShippingQueryOptions(), getProductListQueryOptions()],
  });

  const cart = useCartStore(state => state.cart);
  const cartProductIds = cart.map(item => item.productId);
  const cartProducts = intersectionWith(
    products,
    cartProductIds,
    (product, cartProductId) => product.id === cartProductId
  );

  const totalPrice = sumBy(cartProducts, product => {
    const cartItem = cart.find(item => item.productId === product.id);
    if (!cartItem) {
      return 0;
    }
    return product.price * cartItem.quantity;
  });

  return {
    [SHIPPING_METHOD_TYPE.EXPRESS]: getExpressShippingFee(),
    [SHIPPING_METHOD_TYPE.PREMIUM]: getPremiumShippingFee(gradeShippingList, me.grade, totalPrice),
  };
}

function getExpressShippingFee() {
  return 0;
}

function getPremiumShippingFee(gradeShippingList: GradeShipping[], grade: GradeType, totalPrice: number) {
  const gradeShipping = gradeShippingList.find(gradeShipping => gradeShipping.type === grade);

  if (!gradeShipping) {
    throw new Error('Grade shipping not found');
  }

  if (gradeShipping.freeShippingThreshold <= totalPrice) {
    return 0;
  }

  return gradeShipping.shippingFee;
}
