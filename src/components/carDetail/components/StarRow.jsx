import React, { memo } from 'react';
import { Star } from 'lucide-react';

const StarRow = memo(({ rating, size = 16 }) => (
  <div className='flex items-center gap-0.5'>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        size={size}
        className={n <= rating ? 'text-yellow-400' : 'text-gray-300'}
        fill={n <= rating ? 'currentColor' : 'none'}
        aria-hidden='true'
      />
    ))}
  </div>
));

StarRow.displayName = 'StarRow';

export default StarRow;
