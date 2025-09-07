import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import router from './router';
import { EnhancedToastProvider } from './ui-lib/components/toast';

const queryClient = new QueryClient();

function App() {
  return (
    <EnhancedToastProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </EnhancedToastProvider>
  );
}

export default App;
