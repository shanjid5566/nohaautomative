import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import CarListContent from '../components/carList/CarListContent';

const CarList = memo(() => {
  useSEO({
    title: 'Browse Cars',
    description:
      'Search and filter thousands of quality used and new cars. Find the perfect car that matches your style and budget.',
  });
  return <CarListContent />;
});
CarList.displayName = 'CarList';

export default CarList;
