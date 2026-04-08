import React, { memo, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Fuel,
  Gauge,
  MapPin,
  Settings2,
  ChevronRight,
} from 'lucide-react';
import { ROUTES } from '../../config';
import { FEATURED_CARS } from '../../data/homeData';
import Pagination from '../shared/Pagination';

// ─── CarCard ──────────────────────────────────────────────────────────────────

const CarCard = memo(({ car }) => (
  <article className='border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow'>
    {/* Car image */}
    <div className='w-full h-48 bg-linear-to-br from-slate-300 to-slate-400 overflow-hidden'>
      {car.img && (
        <img
          src={car.img}
          alt={car.title}
          className='w-full h-full object-cover'
          loading='lazy'
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

      {/* Price + CTA — Link instead of button for SEO + semantics */}
      <div className='flex items-center justify-between'>
        <span className='font-bold text-[22px] text-ink font-inter leading-none'>
          {car.price}
        </span>
        <Link
          to={ROUTES.CAR_DETAIL.replace(':id', car.id)}
          className='bg-primary text-white text-[13px] font-semibold font-public-sans px-4 py-2 rounded-md hover:bg-primary-dark transition-colors whitespace-nowrap'
        >
          View Details
        </Link>
      </div>
    </div>
  </article>
));
CarCard.displayName = 'CarCard';

// ─── FeaturedCars ─────────────────────────────────────────────────────────────

const CARS_PER_PAGE = 24;
const TOTAL_PAGES = Math.ceil(FEATURED_CARS.length / CARS_PER_PAGE);

const FeaturedCars = memo(() => {
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef(null);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const visibleCars = FEATURED_CARS.slice(
    (currentPage - 1) * CARS_PER_PAGE,
    currentPage * CARS_PER_PAGE,
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby='featured-heading'
      className='py-16 bg-[#f8f8f8]'
    >
      <div className='max-w-450 mx-auto px-4 lg:px-15'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <h2
            id='featured-heading'
            className='font-poppins font-semibold text-ink text-[28px] leading-none'
          >
            Featured Cars
          </h2>
          <Link
            to={ROUTES.CAR_LIST}
            className='text-primary text-sm font-medium font-inter flex items-center gap-1 hover:underline'
          >
            View All
            <ChevronRight size={16} aria-hidden='true' />
          </Link>
        </div>

        {/* Responsive grid — 1 col → 2 → 3 → 4 → 6 */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4.5'>
          {visibleCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
});
FeaturedCars.displayName = 'FeaturedCars';

export default FeaturedCars;
