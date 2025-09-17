import AsyncBoundaryWithQuery from '@/components/AsyncBoundaryWithQuery';
import BannerSection from './components/BannerSection';
import CurrentLevelSection from './components/CurrentLevelSection';
import ProductListSection from './components/ProductListSection';
import RecentPurchaseSection from './components/RecentPurchaseSection';

function HomePage() {
  return (
    <>
      <BannerSection />
      <CurrentLevelSection />
      <RecentPurchaseSection />
      <AsyncBoundaryWithQuery>
        <ProductListSection />
      </AsyncBoundaryWithQuery>
    </>
  );
}

export default HomePage;
