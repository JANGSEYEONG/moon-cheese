import { ark } from '@ark-ui/react';
import { forwardRef } from 'react';
import { cva, type RecipeVariantProps } from 'styled-system/css';
import { styled, type HTMLStyledProps } from 'styled-system/jsx';

export type TagVariantProps = RecipeVariantProps<typeof tagRecipe>;

export const tagRecipe = cva({
  base: {
    w: 'fit-content',
    px: 1,
    py: '3px',
    rounded: 'md',
    textStyle: 'C2_Medium',
  },

  variants: {
    type: {
      yellow: { color: 'secondary.02_orange', bgColor: 'background.04_yellow' },

      brown: {
        color: 'secondary.01_brown',
        bgColor: 'background.06_brown',
      },

      green: {
        color: 'state.green',
        bgColor: 'background.05_green',
      },
    },
  },

  defaultVariants: {
    type: 'yellow',
  },
});

export type TagProps = TagVariantProps & HTMLStyledProps<'div'>;

export type TagType = Exclude<TagProps['type'], undefined>;

const Tag = forwardRef<HTMLDivElement, TagProps>(({ children, ...props }, ref) => {
  const { type = 'yellow', ...rest } = props;

  const TagComponent = styled(ark.div, tagRecipe);

  return (
    <TagComponent ref={ref} type={type} {...rest}>
      {children}
    </TagComponent>
  );
});

Tag.displayName = 'Tag';

export default Tag;
