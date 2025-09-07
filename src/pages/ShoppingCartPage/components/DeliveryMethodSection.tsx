import type { JSX } from 'react';

import { Flex, Stack, styled } from 'styled-system/jsx';
import { Spacing, Text } from '@/ui-lib';
import { DeliveryIcon, RocketIcon } from '@/ui-lib/components/icons';
import { DELIVERY_METHOD, DELIVERY_METHOD_LABEL, DELIVERY_POLICY, type DeliveryMethod } from '@/domains/delivery';
import PriceDisplay from '@/components/PriceDisplay';

const DELIVERY_ICON: Record<DeliveryMethod, JSX.Element> = {
  [DELIVERY_METHOD.EXPRESS]: <DeliveryIcon size={28} />,
  [DELIVERY_METHOD.PREMIUM]: <RocketIcon size={28} />,
} as const;

interface DeliveryMethodSectionProps {
  selectedDeliveryMethod: DeliveryMethod;
  changeDeliveryMethod: (deliveryType: DeliveryMethod) => void;
  deliveryRateTable: Record<DeliveryMethod, number>;
}

function DeliveryMethodSection({
  selectedDeliveryMethod,
  changeDeliveryMethod,
  deliveryRateTable,
}: DeliveryMethodSectionProps) {
  return (
    <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
      <Text variant="H2_Bold">배송 방식</Text>

      <Spacing size={4} />

      <Stack gap={4}>
        {Object.entries(DELIVERY_METHOD_LABEL).map(([method, label]) => {
          const currentMethod = method as DeliveryMethod;
          return (
            <DeliveryItem
              key={currentMethod}
              title={label}
              description={DELIVERY_POLICY[currentMethod].deliveryPeriod}
              icon={DELIVERY_ICON[currentMethod]}
              price={deliveryRateTable[currentMethod]}
              isSelected={selectedDeliveryMethod === currentMethod}
              onClick={() => changeDeliveryMethod(currentMethod)}
            />
          );
        })}
      </Stack>
    </styled.section>
  );
}

function DeliveryItem({
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
