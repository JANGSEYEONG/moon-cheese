import { createBrowserRouter } from 'react-router';
import PageLayout from '@/layout/PageLayout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import AsyncBoundaryWithQuery from './components/AsyncBoundaryWithQuery';

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
          <AsyncBoundaryWithQuery>
            <ShoppingCartPage />
          </AsyncBoundaryWithQuery>
        ),
      },
    ],
  },
]);

export default router;
