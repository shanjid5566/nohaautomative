import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MapPin,
  MessageCircle,
  User,
} from 'lucide-react';
import { ROUTES } from '../../../config';

const GallerySellerSection = memo(
  ({ car, activeImg, carImages, onPrev, onNext, onSelectImage }) => (
    <div className='flex flex-col lg:flex-row gap-4 mb-5'>
      <div className='flex gap-2 sm:gap-3 flex-1 min-w-0'>
        <div className='flex flex-col gap-1.5 sm:gap-2 w-14 sm:w-18 lg:w-37.5 shrink-0 h-64 sm:h-80 lg:h-150'>
          <button
            type='button'
            onClick={onPrev}
            aria-label='Previous image'
            className='w-full shrink-0 flex items-center justify-center py-1.5 rounded bg-primary hover:bg-primary-dark text-white transition-colors'
          >
            <ChevronUp size={16} aria-hidden='true' />
          </button>

          {carImages.map((src, i) => (
            <button
              key={i}
              type='button'
              onClick={() => onSelectImage(i)}
              aria-label={`View image ${i + 1}`}
              className={`flex-1 min-h-0 w-full rounded overflow-hidden border-2 transition-colors ${
                activeImg === i ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img
                src={src}
                alt={`${car.title} view ${i + 1}`}
                className='w-full h-full object-cover'
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add('bg-gray-200');
                }}
              />
            </button>
          ))}

          <button
            type='button'
            onClick={onNext}
            aria-label='Next image'
            className='w-full shrink-0 flex items-center justify-center py-1.5 rounded bg-primary hover:bg-primary-dark text-white transition-colors'
          >
            <ChevronDown size={16} aria-hidden='true' />
          </button>
        </div>

        <div className='flex-1 h-64 sm:h-80 lg:h-150 rounded overflow-hidden bg-gray-200'>
          <img
            src={carImages[activeImg]}
            alt={car.title}
            className='w-full h-full object-cover'
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.classList.add(
                'bg-gradient-to-br',
                'from-slate-300',
                'to-slate-400',
              );
            }}
          />
        </div>
      </div>

      <div className='lg:w-85 shrink-0'>
        <div className='bg-[#f9fafb] border border-gray-100 rounded-2xl p-6 flex flex-col gap-5'>
          <p className='font-inter font-medium text-base text-[#0a0a0a]'>
            Seller Information
          </p>

          <div className='flex items-start gap-3'>
            <div className='w-12 h-12 rounded-full bg-[rgba(108,59,255,0.1)] flex items-center justify-center shrink-0'>
              <User size={24} className='text-primary' aria-hidden='true' />
            </div>
            <div className='flex flex-col gap-0.5'>
              <div className='flex items-center gap-2'>
                <span className='font-inter font-semibold text-lg text-[#0a0a0a] leading-7'>
                  EV Motors
                </span>
                <BadgeCheck size={16} className='text-primary' aria-hidden='true' />
              </div>
              <span className='font-inter text-sm text-[#717182] leading-5'>
                Member since June 2021
              </span>
              <span className='font-inter text-sm text-[#717182] leading-5'>
                15 active listings
              </span>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <MapPin size={16} className='text-[#717182]' aria-hidden='true' />
            <span className='font-inter text-sm text-[#717182]'>Manchester</span>
          </div>

          <div className='flex flex-col gap-3 pt-2'>
            <Link
              to={"/user/message"}
              state={{ sellerId: 'ev-motors', sellerName: 'EV Motors' }}
              className='w-full h-10 rounded-[10px] bg-primary hover:bg-primary-dark text-white font-inter font-medium text-sm flex items-center justify-center gap-2 transition-colors'
            >
              <MessageCircle size={16} aria-hidden='true' />
              Chat with Seller
            </Link>
            <Link
              to={ROUTES.SELLER_PROFILE.replace(':id', 'ev-motors')}
              className='w-full h-10 rounded-[10px] bg-primary-light hover:bg-[#e2d9ff] text-primary font-inter text-sm flex items-center justify-center gap-2 transition-colors'
            >
              View Seller Profile
              <ExternalLink size={16} aria-hidden='true' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  ),
);

GallerySellerSection.displayName = 'GallerySellerSection';

export default GallerySellerSection;
