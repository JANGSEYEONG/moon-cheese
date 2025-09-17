import { type ComponentProps } from 'react';

import { AsyncBoundary } from '@toss/async-boundary';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import LoadingSection from './LoadingSection';
import ErrorSection from './ErrorSection';

type AsyncBoundaryProps = ComponentProps<typeof AsyncBoundary>;

type AsyncBoundaryWithQueryProps = Omit<AsyncBoundaryProps, 'pendingFallback' | 'rejectedFallback'> & {
  pendingFallback?: AsyncBoundaryProps['pendingFallback'];
  rejectedFallback?: AsyncBoundaryProps['rejectedFallback'];
};

function AsyncBoundaryWithQuery({
  pendingFallback = <LoadingSection />,
  rejectedFallback = ({ reset }) => <ErrorSection onRetry={reset} />,
  ...props
}: AsyncBoundaryWithQueryProps) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <AsyncBoundary onReset={reset} pendingFallback={pendingFallback} rejectedFallback={rejectedFallback} {...props} />
  );
}

export default AsyncBoundaryWithQuery;
