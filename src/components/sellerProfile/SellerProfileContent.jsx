import React, { memo, useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePageLoadState } from '../../hooks/usePageLoadState';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import CtaSection from '../shared/CtaSection';
import PageStateView from '../shared/PageStateView';
import SellerHeroBanner from './components/SellerHeroBanner';
import SellerInfoSection from './components/SellerInfoSection';
import SellerListingsSection from './components/SellerListingsSection';
import {
  AVATAR_IMAGE,
  HERO_IMAGE,
  SELLER_DATA,
  TOTAL_PAGES,
} from './components/constants';

const SellerProfileContent = () => {
  const { id } = useParams();
  const seller = SELLER_DATA[id] || SELLER_DATA.default;
  const { isLoading, retry } = usePageLoadState();

  const [currentPage, setCurrentPage] = useState(1);
  const listingsRef = useRef(null);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    listingsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const isEmpty = !isLoading && !seller;

  if (isLoading || isEmpty) {
    return (
      <div className='min-h-screen font-inter bg-white'>
        <Navbar />
        <main>
          <SellerHeroBanner heroImage={HERO_IMAGE} />
          <div className='container mx-auto px-4 py-10'>
            <PageStateView
              status={isLoading ? 'loading' : 'empty'}
              variant='detail'
              onRetry={retry}
              emptyTitle='Seller profile unavailable'
              emptyDescription='Could not load this seller profile at the moment.'
            />
          </div>
          <CtaSection />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen font-inter bg-white'>
      <Navbar />

      <main>
        <SellerHeroBanner heroImage={HERO_IMAGE} />

        <SellerInfoSection seller={seller} id={id} avatarImage={AVATAR_IMAGE} />

        <SellerListingsSection
          listingsRef={listingsRef}
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPageChange={handlePageChange}
        />

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
};

export default memo(SellerProfileContent);
