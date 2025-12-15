import { getProductListQueryOptions } from '@/api/getProductList';
import { PriceDisplay } from '@/components/PriceDisplay';
import { PRODUCT_CATEGORY, type Product } from '@/models/product';
import { Counter, SubGNB, Text } from '@/ui-lib';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router';
import { Box, Grid, styled } from 'styled-system/jsx';
import ProductItem from './ProductItem';

function ProductListSection() {
  const [currentTab, setCurrentTab] = useState('all');

  const {
    data: { products },
  } = useSuspenseQuery(getProductListQueryOptions());

  return (
    <styled.section bg="background.01_white">
      <Box css={{ px: 5, pt: 5, pb: 4 }}>
        <Text variant="H1_Bold">판매중인 상품</Text>
      </Box>
      <SubGNB.Root value={currentTab} onValueChange={details => setCurrentTab(details.value)}>
        <SubGNB.List>
          <SubGNB.Trigger value="all">전체</SubGNB.Trigger>
          <SubGNB.Trigger value={PRODUCT_CATEGORY.CHEESE}>치즈</SubGNB.Trigger>
          <SubGNB.Trigger value={PRODUCT_CATEGORY.CRACKER}>크래커</SubGNB.Trigger>
          <SubGNB.Trigger value={PRODUCT_CATEGORY.TEA}>티</SubGNB.Trigger>
        </SubGNB.List>
      </SubGNB.Root>
      <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={9} columnGap={4} p={5}>
        {products
          .filter(product => currentTab === 'all' || product.category === currentTab)
          .map(product => (
            <ProductCard key={product.id} product={product} bottomAddOn={<ProductCounter />} />
          ))}
      </Grid>
    </styled.section>
  );
}

export default ProductListSection;

interface ProductCardProps {
  product: Product;
  bottomAddOn: React.ReactNode;
}

function ProductCard({ product, bottomAddOn }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`}>
      <ProductItem.Root>
        <ProductItem.Image src={product.images[0]} alt={product.name} />
        <ProductItem.Info title={product.name} description={product.description} />
        <ProductItem.Meta>
          <ProductItem.MetaLeft>
            <ProductItem.Rating rating={5} />
            <ProductItem.Price>
              <PriceDisplay price={product.price} />
            </ProductItem.Price>
          </ProductItem.MetaLeft>
          {product.category === 'TEA' && product.isCaffeineFree && <ProductItem.FreeTag type="caffeine" />}
          {product.category === 'CRACKER' && product.isGlutenFree && <ProductItem.FreeTag type="gluten" />}
        </ProductItem.Meta>
        {bottomAddOn}
      </ProductItem.Root>
    </Link>
  );
}

function ProductCounter() {
  return (
    <Counter.Root>
      <Counter.Minus onClick={() => {}} disabled={true} />
      <Counter.Display value={3} />
      <Counter.Plus onClick={() => {}} />
    </Counter.Root>
  );
}
