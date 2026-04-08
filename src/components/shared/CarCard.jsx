import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Settings2, Calendar, Gauge, Fuel } from 'lucide-react';
import { ROUTES } from '../../config';

export const BADGE_STYLES = {
  Featured: 'bg-primary',
  New: 'bg-emerald-500',
  Hot: 'bg-rose-500',
};

const CarCard = memo(({ car }) => {
  const imageSources = useMemo(() => {
    if (!car?.img) {
      return { src: '', srcSet: '' };
    }

    if (!car.img.includes('images.unsplash.com')) {
      return { src: car.img, srcSet: '' };
    }

    const build = (width, quality) => {
      try {
        const url = new URL(car.img);
        url.searchParams.set('w', String(width));
        url.searchParams.set('q', String(quality));
        url.searchParams.set('auto', 'format');
        return url.toString();
      } catch {
        return car.img;
      }
    };

    const small = build(360, 55);
    const medium = build(520, 60);
    const large = build(760, 65);

    return {
      src: medium,
      srcSet: `${small} 360w, ${medium} 520w, ${large} 760w`,
    };
  }, [car?.img]);

  return (
    <Link
      to={ROUTES.CAR_DETAIL.replace(':id', car.id)}
      className='border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer block no-underline'
    >
    {/* Car image */}
    <div className='relative w-full h-48 bg-linear-to-br from-slate-300 to-slate-400 overflow-hidden'>
      {car.img && (
        <img
          src={imageSources.src}
          srcSet={imageSources.srcSet || undefined}
          sizes='(max-width: 640px) 92vw, (max-width: 1280px) 46vw, 30vw'
          alt={car.title}
          className='w-full h-full object-cover object-top'
          loading='lazy'
          decoding='async'
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
    </div>

    {/* Info */}
    <div className='px-4 pt-4 pb-4'>
      <h3 className='font-semibold text-[15px] text-ink font-inter mb-3 leading-snug line-clamp-1'>
        {car.title}
      </h3>

      {/* Year · Mileage · Fuel */}
      <div className='flex items-center gap-4 text-gray-500 text-[13px] font-inter mb-2'>
        <span className='flex items-center gap-1'>
          <Calendar size={14} aria-hidden='true' />
          {car.year}
        </span>
        <span className='flex items-center gap-1'>
          <Gauge size={14} aria-hidden='true' />
          {car.mileage}
        </span>
        <span className='flex items-center gap-1'>
          <Fuel size={14} aria-hidden='true' />
          {car.fuel}
        </span>
      </div>

      {/* Location · Transmission */}
      <div className='flex items-center justify-between text-gray-500 text-[13px] font-inter mb-4'>
        <span className='flex items-center gap-1'>
          <MapPin size={14} aria-hidden='true' />
          {car.location}
        </span>
        <span className='flex items-center gap-1'>
          <Settings2 size={14} aria-hidden='true' />
          {car.transmission}
        </span>
      </div>

      {/* Price + CTA */}
      <div className='flex items-center justify-between'>
        <span className='font-bold text-[22px] text-ink font-inter leading-none'>
          {car.price}
        </span>
        <span className='bg-primary text-white text-[13px] font-semibold font-public-sans px-4 py-2 rounded-md hover:bg-primary-dark transition-colors whitespace-nowrap'>
          View Details
        </span>
      </div>
    </div>
    </Link>
  );
});
CarCard.displayName = 'CarCard';

export default CarCard;
