import { useNavigate } from 'react-router';
import { Grid } from 'styled-system/jsx';
import { useProductList } from '@/hooks/queries/useProductList';
import { PRODUCT_CATEGORY_WITH_ALL, type ProductTabCategoryWithAll } from '@/domains/product';
import Product from './ProductListItem';

interface ProductListProps {
  currentTab: ProductTabCategoryWithAll;
}
function ProductList({ currentTab }: ProductListProps) {
  const navigate = useNavigate();

  const {
    data: { products },
  } = useProductList();

  const filteredProducts =
    currentTab === PRODUCT_CATEGORY_WITH_ALL.ALL
      ? products
      : products.filter(product => product.category === currentTab);

  const goProductDetail = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={9} columnGap={4} p={5}>
      {filteredProducts.map(product => (
        <Product product={product} onClick={goProductDetail} />
      ))}
    </Grid>
  );
}

export default ProductList;
