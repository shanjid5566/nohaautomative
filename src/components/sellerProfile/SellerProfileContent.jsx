import React, { memo, useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import CtaSection from '../shared/CtaSection';
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

  const [currentPage, setCurrentPage] = useState(1);
  const listingsRef = useRef(null);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    listingsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

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
