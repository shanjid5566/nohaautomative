import React, { memo } from 'react';
import StarRow from './StarRow';

const ReviewCard = memo(({ review }) => (
  <div className='flex items-start justify-between border-b border-gray-100 pb-4 last:border-0'>
    <div className='flex flex-col gap-2 flex-1 mr-8'>
      <p className='font-inter font-normal text-xl text-black leading-8'>
        {review.name}
      </p>
      <StarRow rating={review.rating} size={16} />
      <p className='font-inter text-sm text-[#272727] leading-5.5'>{review.text}</p>
    </div>
    <p className='font-inter text-base text-[#4e4e4e] leading-6 whitespace-nowrap shrink-0'>
      {review.date}
    </p>
  </div>
));

ReviewCard.displayName = 'ReviewCard';

export default ReviewCard;
