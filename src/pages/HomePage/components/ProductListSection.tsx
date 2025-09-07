import { SubGNB, Text } from '@/ui-lib';
import { useState } from 'react';
import { Box, styled } from 'styled-system/jsx';
import {
  PRODUCT_CATEGORY_LABEL_WITH_ALL,
  PRODUCT_CATEGORY_WITH_ALL,
  type ProductTabCategoryWithAll,
} from '@/domains/product';
import ProductList from './ProductList';

function ProductListSection() {
  const [currentTab, setCurrentTab] = useState<ProductTabCategoryWithAll>(PRODUCT_CATEGORY_WITH_ALL.ALL);

  return (
    <styled.section bg="background.01_white">
      <Box css={{ px: 5, pt: 5, pb: 4 }}>
        <Text variant="H1_Bold">판매중인 상품</Text>
      </Box>
      <SubGNB.Root
        value={currentTab}
        onValueChange={details => setCurrentTab(details.value as ProductTabCategoryWithAll)}
      >
        <SubGNB.List>
          {Object.entries(PRODUCT_CATEGORY_LABEL_WITH_ALL).map(([key, value]) => (
            <SubGNB.Trigger value={key}>{value}</SubGNB.Trigger>
          ))}
        </SubGNB.List>
      </SubGNB.Root>
      <ProductList currentTab={currentTab} />
    </styled.section>
  );
}

export default ProductListSection;
