import React, { memo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import CtaSection from '../shared/CtaSection';
import { ROUTES } from '../../config';

/* ── Static data ─────────────────────────────────────────── */
const REVIEWS = [
  {
    id: 1,
    name: 'Michael Chan',
    rating: 5,
    text: 'The car was exactly as described. He answered all my questions and made the whole process smooth and transparent.',
    date: '10/5/2025',
  },
  {
    id: 2,
    name: 'Michael Chan',
    rating: 5,
    text: 'I contacted the seller through chat and got instant replies. Everything was clear, and there were no hidden issues.',
    date: '10/5/2025',
  },
  {
    id: 3,
    name: 'Michael Chan',
    rating: 5,
    text: "Very friendly and helpful. He even guided me through the paperwork process. I'm really satisfied with my purchase.",
    date: '10/5/2025',
  },
  {
    id: 4,
    name: 'Michael Chan',
    rating: 5,
    text: 'The car condition matched the photos and details. No surprises at all. Would definitely buy again from this seller.',
    date: '10/5/2025',
  },
  {
    id: 5,
    name: 'Michael Chan',
    rating: 5,
    text: 'From first contact to final deal, everything went perfectly. The seller was cooperative and honest.',
    date: '10/5/2025',
  },
  {
    id: 6,
    name: 'Michael Chan',
    rating: 5,
    text: 'From first contact to final deal, everything went perfectly. The seller was cooperative and honest.',
    date: '10/5/2025',
  },
  {
    id: 7,
    name: 'Michael Chan',
    rating: 5,
    text: 'From first contact to final deal, everything went perfectly. The seller was cooperative and honest.',
    date: '10/5/2025',
  },
  {
    id: 8,
    name: 'Michael Chan',
    rating: 5,
    text: 'From first contact to final deal, everything went perfectly. The seller was cooperative and honest.',
    date: '10/5/2025',
  },
];

/* bar widths from Figma (fill px out of 130px track)
   5★: 127px  4★: 107px  3★: 82px  2★: 32px  1★: 13px */
const RATING_BARS = [
  { star: 5, fillW: 127, trackW: 130 },
  { star: 4, fillW: 107, trackW: 130 },
  { star: 3, fillW: 82, trackW: 130 },
  { star: 2, fillW: 32, trackW: 130 },
  { star: 1, fillW: 13, trackW: 130 },
];

/* ── Sub-components ──────────────────────────────────────── */
const StarRow = memo(({ rating, size = 16 }) => (
  <div className='flex items-center gap-0'>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        size={size}
        className={n <= rating ? 'text-yellow-400' : 'text-gray-300'}
        fill='currentColor'
        aria-hidden='true'
      />
    ))}
  </div>
));

const ReviewRow = memo(({ review }) => (
  <div className='flex items-center justify-between border-b border-gray-100 pb-3.5'>
    <div className='flex flex-col gap-2 w-[calc(100%-160px)]'>
      <p className='font-roboto font-normal text-xl text-black leading-8'>
        {review.name}
      </p>
      <StarRow rating={review.rating} size={16} />
      <p className='font-roboto font-normal text-[#272727] text-sm leading-5.5'>
        {review.text}
      </p>
    </div>
    <p className='font-roboto font-normal text-[#4e4e4e] text-base leading-6 whitespace-nowrap shrink-0'>
      {review.date}
    </p>
  </div>
));

/* ── Main component ──────────────────────────────────────── */
const SellerReviewsContent = memo(() => {
  const { id } = useParams();
  const [userRating, setUserRating] = useState(4);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const sellerProfilePath = ROUTES.SELLER_PROFILE.replace(
    ':id',
    id || 'ev-motors',
  );

  return (
    <>
      <Navbar />
      <main className='min-h-screen bg-white'>
        <div className='container mx-auto px-4 py-10'>
          {/* ── Back link ───────────────────────────────── */}
          <div className='mb-6'>
            <Link
              to={sellerProfilePath}
              className='font-inter text-sm text-primary hover:underline'
            >
              ← Back to Seller Profile
            </Link>
          </div>

          {/* ── Section 1: Feedback heading + summary ─── */}
          <div className='flex flex-col gap-8.75'>
            <p className='font-montserrat font-medium text-2xl text-black leading-normal'>
              Feedback
            </p>

            {/* Rating + bars row */}
            <div className='flex gap-4 items-center w-full max-w-94'>
              {/* Left: big number */}
              <div className='flex flex-col gap-2.5 items-start w-47.25'>
                <div className='flex items-end whitespace-nowrap'>
                  <span className="font-['Helvetica_Neue','Helvetica',sans-serif] font-medium text-8xl text-[#1c1c1c] leading-25 capitalize">
                    4,5
                  </span>
                  <span className="font-['Helvetica_Neue','Helvetica',sans-serif] text-2xl text-[#424242] leading-9.5">
                    /5
                  </span>
                </div>
                <p className="font-['Helvetica_Neue','Helvetica',sans-serif] text-xl text-[#080f1a] leading-8">
                  ( 50 new review )
                </p>
              </div>

              {/* Right: distribution bars */}
              <div className='flex flex-col gap-2.5 items-start w-41.75'>
                {RATING_BARS.map(({ star, fillW, trackW }) => (
                  <div key={star} className='flex gap-2 items-center w-full'>
                    {/* Star icon + number */}
                    <div className='flex gap-1 items-center shrink-0'>
                      <Star
                        size={16}
                        className='text-yellow-400'
                        fill='currentColor'
                        aria-hidden='true'
                      />
                      <span className="font-['Helvetica_Neue','Helvetica',sans-serif] font-medium text-base text-black leading-5">
                        {star}
                      </span>
                    </div>
                    {/* Progress bar — stacked grid technique from Figma */}
                    <div
                      className='relative h-1 rounded-[50px] shrink-0'
                      style={{ width: trackW }}
                    >
                      {/* Gray track */}
                      <div
                        className='absolute inset-0 bg-[#d9d9d9] rounded-[50px]'
                        style={{ width: trackW }}
                      />
                      {/* Dark fill */}
                      <div
                        className='absolute inset-0 bg-[#2a2a2a] rounded-[50px]'
                        style={{ width: fillW }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Section 2: Customer Feedback card ─── */}
            <div className='bg-white border border-gray-200 rounded-xl w-full overflow-hidden'>
              {/* Header */}
              <div className='px-5.75 pt-6 pb-4 border-b border-gray-100'>
                <p className='font-poppins font-medium text-2xl text-black leading-normal whitespace-nowrap'>
                  Customer Feedback
                </p>
              </div>

              {/* Review rows */}
              <div className='px-5.75 flex flex-col gap-0 pt-3.5'>
                {REVIEWS.map((review) => (
                  <ReviewRow key={review.id} review={review} />
                ))}
              </div>
            </div>

            {/* ── Section 3: Seller Rating form ──────── */}
            <div className='bg-[#e6f0f8] flex flex-col gap-4 items-end p-4 rounded-lg w-full'>
              {/* Stars */}
              <div className='flex flex-col gap-2 items-start w-full'>
                <p className='font-inter font-medium text-xl text-black leading-normal text-center w-full whitespace-nowrap'>
                  Seller Rating
                </p>
                <div className='flex gap-2 items-start'>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type='button'
                      aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
                      className='w-8 h-8 flex items-center justify-center focus:outline-none cursor-pointer'
                      onMouseEnter={() => setHoverRating(n)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setUserRating(n)}
                    >
                      <Star
                        size={24}
                        className={
                          n <= (hoverRating || userRating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }
                        fill='currentColor'
                        aria-hidden='true'
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review textarea */}
              <div className='flex flex-col gap-2 items-center w-full'>
                <p className='font-inter font-medium text-xl text-black leading-normal w-full'>
                  Review
                </p>
                <div className='bg-white h-39.25 p-2.5 rounded-lg w-full'>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder='Write here'
                    className='w-full h-full resize-none bg-transparent border-none outline-none font-lato text-xs text-secondary leading-normal placeholder:text-secondary'
                    aria-label='Write your review'
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type='button'
                className='bg-primary hover:bg-primary-dark transition-colors w-full flex items-center justify-center px-2.5 py-3 rounded-sm font-poppins font-medium text-base text-white leading-normal'
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────── */}
        <CtaSection />
      </main>
      <Footer />
    </>
  );
});

SellerReviewsContent.displayName = 'SellerReviewsContent';

export default SellerReviewsContent;
