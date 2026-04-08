import React, { memo } from 'react';
import { Star } from 'lucide-react';
import ReviewCard from './ReviewCard';

const FeedbackSection = memo(({ ratingBars, reviews }) => (
  <div className='mb-5 flex flex-col gap-8'>
    <h2 className='font-inter font-medium text-2xl text-black'>Feedback</h2>

    <div className='flex flex-col sm:flex-row items-start gap-8'>
      <div className='flex flex-col gap-1 shrink-0'>
        <div className='flex items-end gap-1'>
          <span
            className='font-inter font-medium text-[#1c1c1c] leading-none'
            style={{ fontSize: '72px' }}
          >
            4.5
          </span>
          <span className='font-inter text-[#424242] text-2xl leading-10'>/5</span>
        </div>
        <span className='font-inter text-[#080f1a] text-base'>( 50 new reviews )</span>
      </div>

      <div className='flex flex-col gap-3 flex-1 min-w-0 max-w-70'>
        {ratingBars.map(({ star, pct }) => (
          <div key={star} className='flex items-center gap-3'>
            <div className='flex items-center gap-1 w-6 shrink-0'>
              <Star
                size={14}
                className='text-yellow-400'
                fill='currentColor'
                aria-hidden='true'
              />
              <span className='font-inter text-sm text-black'>{star}</span>
            </div>
            <div className='relative flex-1 h-1 bg-[#d9d9d9] rounded-full overflow-hidden'>
              <div
                className='absolute left-0 top-0 h-full bg-[#2a2a2a] rounded-full'
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className='bg-white border border-gray-100 rounded-xl overflow-hidden'>
      <div className='px-6 py-5 border-b border-gray-100'>
        <p className='font-poppins text-2xl text-black font-medium'>Customer Feedback</p>
      </div>
      <div className='px-6 py-4 flex flex-col gap-5'>
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </div>
  </div>
));

FeedbackSection.displayName = 'FeedbackSection';

export default FeedbackSection;
