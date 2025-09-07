import type { ProductCategory } from '@/domains/product';
import type { TagType } from '@/ui-lib';

export const productCategoryToTagType = (category: ProductCategory): TagType => {
  const categoryMap: Record<ProductCategory, TagType> = {
    CHEESE: 'cheese',
    CRACKER: 'cracker',
    TEA: 'tea',
  };

  return categoryMap[category];
};
