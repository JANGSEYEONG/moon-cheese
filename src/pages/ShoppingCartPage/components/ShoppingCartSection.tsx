import { Button, Spacing, Text } from '@/ui-lib';
import { Flex, styled } from 'styled-system/jsx';
import { useCartStore } from '@/stores/cartStore';
import ShoppingCartList from './ShoppingCartList';

function ShoppingCartSection() {
  const removeAllItems = useCartStore(state => state.removeAllItems);

  return (
    <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
      <Flex justify="space-between">
        <Text variant="H2_Bold">장바구니</Text>
        <Button color={'neutral'} size="sm" onClick={removeAllItems}>
          전체삭제
        </Button>
      </Flex>
      <Spacing size={4} />
      <ShoppingCartList />
    </styled.section>
  );
}

export default ShoppingCartSection;
