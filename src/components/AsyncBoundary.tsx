import { QueryErrorResetBoundary } from '@tanstack/react-query';
import ErrorSection from './ErrorSection';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import LoadingSection from './LoadingSection';

interface AsyncBoundaryProps {
  children: React.ReactNode;
}
function AsyncBoundary({ children }: AsyncBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      <ErrorBoundary FallbackComponent={({ resetErrorBoundary }) => <ErrorSection onRetry={resetErrorBoundary} />}>
        <Suspense fallback={<LoadingSection />}>{children}</Suspense>
      </ErrorBoundary>
    </QueryErrorResetBoundary>
  );
}

export default AsyncBoundary;
