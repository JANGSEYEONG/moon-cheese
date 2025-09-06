import { Counter } from '@/ui-lib';
import { useNavigate } from 'react-router';
import { Grid } from 'styled-system/jsx';
import ProductItem from '../components/ProductItem';
import PriceDisplay from '@/components/PriceDisplay';
import { useProductList } from '@/hooks/queries/useProductList';
import { PRODUCT_CATEGORY_WITH_ALL, type ProductTabCategoryWithAll } from '@/domains/product';

interface ProductListProps {
  currentTab: ProductTabCategoryWithAll;
}
function ProductList({ currentTab }: ProductListProps) {
  const navigate = useNavigate();

  const {
    data: { products },
  } = useProductList();
  console.log(products);

  const filteredProducts =
    currentTab === PRODUCT_CATEGORY_WITH_ALL.ALL
      ? products
      : products.filter(product => product.category === currentTab);

  const handleClickProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={9} columnGap={4} p={5}>
      {filteredProducts.map(product => (
        <ProductItem.Root onClick={() => handleClickProduct(product.id)}>
          <ProductItem.Image src={product.images[0]} alt={product.name} />
          <ProductItem.Info title={product.name} description={product.description} />
          <ProductItem.Meta>
            <ProductItem.MetaLeft>
              <ProductItem.Rating rating={product.rating} />
              <ProductItem.Price>
                <PriceDisplay price={product.price} />
              </ProductItem.Price>
            </ProductItem.MetaLeft>
            {product.isCaffeineFree && <ProductItem.FreeTag type="gluten" />}
            {product.isGlutenFree && <ProductItem.FreeTag type="caffeine" />}
          </ProductItem.Meta>
          <Counter.Root>
            <Counter.Minus onClick={() => {}} disabled={true} />
            <Counter.Display value={3} />
            <Counter.Plus onClick={() => {}} />
          </Counter.Root>
        </ProductItem.Root>
      ))}
    </Grid>
  );
}

export default ProductList;
