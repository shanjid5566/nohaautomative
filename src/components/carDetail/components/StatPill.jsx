import React, { memo } from 'react';

const StatPill = memo(({ icon: Icon, label, value }) => (
  <div className='flex items-center gap-3 bg-[rgba(237,233,255,0.5)] rounded-xl px-3 h-16 min-w-35 flex-1'>
    <div className='shrink-0 w-5 h-5 text-primary'>
      <Icon size={20} aria-hidden='true' />
    </div>
    <div className='flex flex-col'>
      <span className='text-[#717182] text-xs font-inter leading-4'>{label}</span>
      <span className='text-[#0a0a0a] text-base font-semibold font-inter leading-6 whitespace-nowrap'>
        {value}
      </span>
    </div>
  </div>
));

StatPill.displayName = 'StatPill';

export default StatPill;
