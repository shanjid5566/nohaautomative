import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { ROUTES } from '../../../config';

const SellerInfoSection = memo(({ seller, id, avatarImage }) => (
  <section className='bg-white pt-0 pb-8'>
    <div className='container mx-auto px-4'>
      <div className='-mt-10 mb-4 relative z-10'>
        <div className='w-20 h-20 rounded-full border-4 border-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] overflow-hidden'>
          <img
            src={avatarImage}
            alt={seller.name}
            className='w-full h-full object-cover'
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.classList.add(
                'bg-[rgba(108,59,255,0.15)]',
                'flex',
                'items-center',
                'justify-center',
              );
            }}
          />
        </div>
      </div>

      <h1 className='font-poppins font-bold text-2xl text-[#0a0a0a] leading-tight mb-1.5'>
        {seller.name}
      </h1>

      <div className='flex items-center gap-1.5 mb-4'>
        <Star
          size={16}
          className='text-yellow-400'
          fill='currentColor'
          aria-hidden='true'
        />
        <span className='font-inter text-sm text-[#0a0a0a] font-medium'>
          {seller.rating}
        </span>
        <Link
          to={ROUTES.SELLER_REVIEWS.replace(':id', id || 'ev-motors')}
          className='font-inter text-sm text-[#717182] hover:text-primary hover:underline underline-offset-2 transition-colors cursor-pointer'
        >
          ( {seller.reviewCount} reviews )
        </Link>
      </div>

      <div className='max-w-170 mb-5 flex flex-col gap-1.5'>
        {seller.description.map((para, i) => (
          <p key={i} className='font-inter text-sm text-[#4a4a5a] leading-[1.7]'>
            {para}
          </p>
        ))}
      </div>

      <div className='flex items-center gap-1.5'>
        <MapPin size={14} className='text-[#717182] shrink-0' aria-hidden='true' />
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(seller.address)}`}
          target='_blank'
          rel='noopener noreferrer'
          className='font-inter text-sm text-primary hover:underline'
        >
          {seller.address}
        </a>
      </div>
    </div>
  </section>
));

SellerInfoSection.displayName = 'SellerInfoSection';

export default SellerInfoSection;
