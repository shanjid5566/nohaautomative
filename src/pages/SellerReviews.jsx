import React, { memo } from 'react';
import SellerReviewsContent from '../components/sellerProfile/SellerReviewsContent';
import { useSEO } from '../hooks/useSEO';

const SellerReviews = memo(() => {
  useSEO({
    title: 'Seller Reviews',
    description:
      "Read customer feedback and reviews for this seller on the Noha's Automotive marketplace.",
  });
  return <SellerReviewsContent />;
});

SellerReviews.displayName = 'SellerReviews';

export default SellerReviews;
