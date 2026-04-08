import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import HomeContent from '../components/home/HomeContent';

const Home = memo(() => {
  useSEO({
    title: "Find Your Dream Car — UK's Most Trusted Car Marketplace",
    description:
      "Buy and sell premium vehicles on the UK's most trusted car marketplace. Browse SUVs, Sedans, Hatchbacks, Hybrids and more.",
    keywords: [
      'car marketplace',
      'used cars',
      'buy car',
      'sell car',
      'UK cars',
    ],
  });

  return <HomeContent />;
});

Home.displayName = 'Home';

export default Home;
