import { createBrowserRouter } from 'react-router';
import PageLayout from '@/layout/PageLayout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import AsyncBoundary from './components/AsyncBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/product/:id',
        element: <ProductDetailPage />,
      },
      {
        path: '/shopping-cart',
        element: (
          <AsyncBoundary>
            <ShoppingCartPage />
          </AsyncBoundary>
        ),
      },
    ],
  },
]);

export default router;
