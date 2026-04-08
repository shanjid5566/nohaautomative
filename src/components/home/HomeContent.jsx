import React, { memo } from 'react';
import SharedNavbar from '../shared/Navbar';
import Hero from './Hero';
import BrowseByType from './BrowseByType';
import FeaturedCars from './FeaturedCars';
import CtaSection from '../shared/CtaSection';
import HomeFooter from './HomeFooter';
import Footer from '../shared/Footer';

// ─── Page shell — SEO is handled in src/pages/Home.jsx via useSEO ────────────

const HomeContent = memo(() => (
  <div className='min-h-screen font-inter overflow-x-hidden'>
    <SharedNavbar />
    <main id='main-content'>
      <Hero />
      <BrowseByType />
      <FeaturedCars />
      <CtaSection />
    </main>
    <Footer/>
  </div>
));
HomeContent.displayName = 'HomeContent';

export default HomeContent;
