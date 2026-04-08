import React, { memo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ALL_CARS } from '../../data/cars';
import { usePageLoadState } from '../../hooks/usePageLoadState';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import CtaSection from '../shared/CtaSection';
import PageStateView from '../shared/PageStateView';
import CarSummarySection from './components/CarSummarySection';
import FeedbackSection from './components/FeedbackSection';
import GallerySellerSection from './components/GallerySellerSection';
import LeaveReviewSection from './components/LeaveReviewSection';
import SpecificationsSection from './components/SpecificationsSection';
import { CAR_IMAGES, RATING_BARS, REVIEWS } from './components/constants';

const CarDetailContent = () => {
  const { id } = useParams();
  const { isLoading, retry } = usePageLoadState();
  const car = ALL_CARS.find((c) => String(c.id) === String(id));

  const [activeImg, setActiveImg] = useState(3);
  const [reviewRating, setReviewRating] = useState(4);
  const [reviewText, setReviewText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const prevImg = () =>
    setActiveImg((p) => (p === 0 ? CAR_IMAGES.length - 1 : p - 1));
  const nextImg = () =>
    setActiveImg((p) => (p === CAR_IMAGES.length - 1 ? 0 : p + 1));

  const isEmpty = !isLoading && !car;

  if (isLoading || isEmpty) {
    return (
      <div className='min-h-screen bg-white font-inter'>
        <Navbar />
        <main className='container mx-auto px-4 pt-8 pb-16'>
          <PageStateView
            status={isLoading ? 'loading' : 'empty'}
            variant='detail'
            onRetry={retry}
            emptyTitle='Car not found'
            emptyDescription='The requested car detail is not available right now.'
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white font-inter'>
      <Navbar />

      <main className='container mx-auto px-4 pt-8 pb-16'>
        <GallerySellerSection
          car={car}
          activeImg={activeImg}
          carImages={CAR_IMAGES}
          onPrev={prevImg}
          onNext={nextImg}
          onSelectImage={setActiveImg}
        />

        <CarSummarySection car={car} />

        <SpecificationsSection car={car} />

        <FeedbackSection ratingBars={RATING_BARS} reviews={REVIEWS} />

        <LeaveReviewSection
          reviewRating={reviewRating}
          hoverRating={hoverRating}
          reviewText={reviewText}
          setReviewRating={setReviewRating}
          setHoverRating={setHoverRating}
          setReviewText={setReviewText}
        />
      </main>

      <CtaSection />

      <Footer />
    </div>
  );
};

export default memo(CarDetailContent);
