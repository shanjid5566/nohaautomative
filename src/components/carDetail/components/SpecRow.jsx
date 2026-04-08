import React, { memo } from 'react';

const SpecRow = memo(({ label, value }) => (
  <div className='flex items-start justify-between border-b border-gray-100 py-2 gap-4'>
    <span className='text-[#313131] text-base font-inter shrink-0'>{label}</span>
    <span className='text-[#0a0a0a] text-base font-medium font-inter text-right'>
      {value}
    </span>
  </div>
));

SpecRow.displayName = 'SpecRow';

export default SpecRow;
