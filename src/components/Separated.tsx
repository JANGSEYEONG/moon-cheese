import { Children, Fragment, isValidElement, type ReactNode } from 'react';

interface SeparatedProps {
  by: ReactNode;
  children: ReactNode;
}

export function Separated({ children, by: separator }: SeparatedProps) {
  const childrenArray = Children.toArray(children).filter(isValidElement);

  return (
    <>
      {childrenArray.map((child, i, { length }) => (
        <Fragment key={i}>
          {child}
          {i + 1 !== length && separator}
        </Fragment>
      ))}
    </>
  );
}
