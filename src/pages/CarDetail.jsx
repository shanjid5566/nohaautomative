import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import CarDetailContent from '../components/carDetail/CarDetailContent';

const CarDetail = memo(() => {
  useSEO({
    title: 'Car Details',
    description:
      'View full details, specifications, and seller information for this vehicle.',
  });
  return <CarDetailContent />;
});

CarDetail.displayName = 'CarDetail';
export default CarDetail;
