import React, { memo } from 'react';
import { Star } from 'lucide-react';

const LeaveReviewSection = memo(
  ({ reviewRating, hoverRating, reviewText, setReviewRating, setHoverRating, setReviewText }) => (
    <div className='rounded-xl border border-gray-100 p-6 mb-5 flex flex-col gap-4 bg-white'>
      <div className='flex flex-col gap-2'>
        <p className='font-inter font-medium text-base text-[#0a0a0a]'>Seller Rating</p>
        <div className='flex items-center gap-1'>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type='button'
              aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
              onClick={() => setReviewRating(n)}
              onMouseEnter={() => setHoverRating(n)}
              onMouseLeave={() => setHoverRating(0)}
              className='transition-transform hover:scale-110'
            >
              <Star
                size={24}
                className={
                  n <= (hoverRating || reviewRating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }
                fill={n <= (hoverRating || reviewRating) ? 'currentColor' : 'none'}
                aria-hidden='true'
              />
            </button>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <label
          htmlFor='review-text'
          className='font-inter font-medium text-sm text-[#0a0a0a]'
        >
          Review
        </label>
        <textarea
          id='review-text'
          rows={4}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder='Share your experience with this seller...'
          className='w-full rounded-lg border border-gray-100 px-4 py-3 font-inter text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none'
        />
      </div>

      <button
        type='button'
        className='w-full h-11 bg-primary hover:bg-primary-dark text-white font-inter font-medium text-base rounded-lg transition-colors'
      >
        Submit
      </button>
    </div>
  ),
);

LeaveReviewSection.displayName = 'LeaveReviewSection';

export default LeaveReviewSection;
