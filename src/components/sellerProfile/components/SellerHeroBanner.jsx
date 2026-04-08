import React, { memo } from 'react';

const SellerHeroBanner = memo(({ heroImage }) => (
  <section className='relative w-full h-80 overflow-hidden' aria-label='Seller hero'>
    <img
      src={heroImage}
      srcSet='https://images.unsplash.com/photo-1555215695-3004980ad54e?w=640&q=55&auto=format 640w, https://images.unsplash.com/photo-1555215695-3004980ad54e?w=960&q=60&auto=format 960w, https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1280&q=60&auto=format 1280w'
      sizes='100vw'
      alt='Seller banner'
      className='w-full h-full object-cover object-center'
      decoding='async'
      fetchPriority='high'
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentElement.classList.add(
          'bg-gradient-to-r',
          'from-[#0c0c1a]',
          'to-[#1a1030]',
        );
      }}
    />
    <div className='absolute bottom-0 left-0 right-0 h-16 bg-linear-to-b from-transparent to-white/20 pointer-events-none' />
  </section>
));

SellerHeroBanner.displayName = 'SellerHeroBanner';

export default SellerHeroBanner;
