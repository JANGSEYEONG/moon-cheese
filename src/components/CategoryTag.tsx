import type { ProductCategory } from '@/models/product';
import { Tag } from '@/ui-lib';

interface CategoryTagProps {
  category: ProductCategory;
}

export function CategoryTag({ category }: CategoryTagProps) {
  switch (category) {
    case 'CHEESE':
      return <Tag type="yellow">Cheese</Tag>;
    case 'CRACKER':
      return <Tag type="brown">Cracker</Tag>;
    case 'TEA':
      return <Tag type="green">Tea</Tag>;
  }
}
