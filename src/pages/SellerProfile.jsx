import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import SellerProfileContent from '../components/sellerProfile/SellerProfileContent';

const SellerProfile = memo(() => {
  useSEO({
    title: 'Seller Profile',
    description:
      'View seller profile, listings, ratings and contact information.',
  });

  return <SellerProfileContent />;
});

SellerProfile.displayName = 'SellerProfile';

export default SellerProfile;
