import React, { memo } from 'react';

const CTA_IMAGE =
  'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1920&q=85';

const CtaSection = memo(() => (
  <section aria-labelledby='cta-heading' className='relative overflow-hidden'>
    {/* Full-bleed background image */}
    <img
      src={CTA_IMAGE}
      alt=''
      aria-hidden='true'
      className='absolute inset-0 w-full h-full object-cover object-center pointer-events-none'
      loading='lazy'
    />

    {/* Dark overlay for text legibility */}
    <div
      className='absolute inset-0 bg-black/60 pointer-events-none'
      aria-hidden='true'
    />

    {/* Content */}
    <div className='relative z-10 py-24 lg:py-32 px-4 text-center'>
      <h2
        id='cta-heading'
        className='font-poppins font-bold text-white text-3xl lg:text-5xl leading-tight mb-4 tracking-tight'
      >
        Ready to Sell Your Car?
      </h2>
      <p className='font-inter text-white/70 text-base mb-8 leading-relaxed'>
        List your car in minutes and reach thousands of buyers
      </p>
      <button
        type='button'
        className='bg-primary text-white font-public-sans font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-primary-dark transition-colors'
      >
        List Your Car
      </button>
    </div>
  </section>
));
CtaSection.displayName = 'CtaSection';

export default CtaSection;
