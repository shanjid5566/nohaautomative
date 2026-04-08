import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { ALL_CARS } from '../../data/cars';
import { usePageLoadState } from '../../hooks/usePageLoadState';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import CarCard from '../shared/CarCard';
import CtaSection from '../shared/CtaSection';
import PageStateView from '../shared/PageStateView';
import FilterSidebar from './components/FilterSidebar';
import HeroSearchBar from './components/HeroSearchBar';
import Pagination from './components/Pagination';
import {
  CARS_PER_PAGE,
  INITIAL_FILTERS,
  TOTAL_PAGES,
} from './components/constants';

const CarListContent = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => ({
    ...INITIAL_FILTERS,
    make: searchParams.get('make') || '',
    model: searchParams.get('model') || '',
    location: searchParams.get('location') || '',
    yearFrom: searchParams.get('year') || 'Any',
    priceRange: searchParams.get('price') || '',
  }));
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const { isLoading, retry } = usePageLoadState();
  const gridSectionRef = useRef(null);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    gridSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  /* Lock body scroll while mobile filter drawer is open */
  useEffect(() => {
    document.body.style.overflow = isMobileFilterOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen]);

  const pageStart = (currentPage - 1) * CARS_PER_PAGE;
  const visibleCars = ALL_CARS.slice(pageStart, pageStart + CARS_PER_PAGE);
  const isEmpty = !isLoading && visibleCars.length === 0;

  if (isLoading || isEmpty) {
    return (
      <div className='min-h-screen font-inter bg-[#f7f8fa]'>
        <Navbar />
        <main className='container mx-auto px-4 py-8'>
          <PageStateView
            status={isLoading ? 'loading' : 'empty'}
            variant='list'
            onRetry={retry}
            emptyTitle='No cars available'
            emptyDescription='No cars matched your current selection. Try again.'
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen font-inter bg-[#f7f8fa]'>
      <Navbar />

      {/* -- Mobile filter drawer - portal, z-[55]/z-[60] above fixed navbar z-50 -- */}
      {createPortal(
        <>
          {/* Backdrop */}
          <div
            aria-hidden='true'
            onClick={() => setIsMobileFilterOpen(false)}
            className={`fixed inset-0 z-55 bg-ink/40 transition-opacity duration-300 lg:hidden ${
              isMobileFilterOpen
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
            }`}
          />
          {/* Sliding panel */}
          <div
            role='dialog'
            aria-modal='true'
            aria-label='Filters'
            className={`fixed top-0 left-0 bottom-0 z-60 w-[85%] max-w-85 bg-white overflow-y-auto shadow-2xl transition-transform duration-500 ease-in-out lg:hidden ${
              isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* Drawer header */}
            <div className='flex items-center justify-between px-4 py-4 border-b border-gray-100 sticky top-0 bg-white z-10'>
              <span className='font-inter font-semibold text-base text-ink'>
                Filters
              </span>
              <button
                type='button'
                onClick={() => setIsMobileFilterOpen(false)}
                className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500'
                aria-label='Close filters'
              >
                <X size={18} aria-hidden='true' />
              </button>
            </div>
            {/* Sidebar content */}
            <div className='p-4'>
              <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
            </div>
          </div>
        </>,
        document.body,
      )}

      <main>
        {/* -- Hero -- */}
        <section className='relative min-h-80 md:min-h-96 lg:min-h-105 flex items-center justify-center overflow-hidden'>
          {/* Background car photo */}
          <img
            src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80'
            alt=''
            aria-hidden='true'
            className='absolute inset-0 w-full h-full object-cover pointer-events-none'
          />
          {/* Dark overlay */}
          <div className='absolute inset-0 bg-linear-to-b from-black/50 via-black/35 to-black/60 pointer-events-none' />

          <div className='relative z-10 w-full container mx-auto px-4 pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 text-left'>
            <h1 className='font-poppins font-bold text-white text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-3'>
              Discover Cars That Match Your Style
            </h1>
            <p className='font-inter text-white/70 text-base max-w-160 mb-8 leading-relaxed'>
              From budget-friendly options to premium vehicles, explore listings
              tailored to your preferences. Filter, compare and connect with
              sellers.
            </p>
            <div className='flex justify-start'>
              <HeroSearchBar
                initialMake={searchParams.get('make') || ''}
                initialModel={searchParams.get('model') || ''}
                initialYear={searchParams.get('year') || ''}
                initialPrice={searchParams.get('price') || ''}
              />
            </div>
          </div>
          {/* Bottom fade */}
          <div className='absolute bottom-0 left-0 right-0 h-12 bg-linear-to-b from-transparent to-[#f7f8fa] pointer-events-none' />
        </section>

        {/* -- Content: sidebar + grid -- */}
        <div className='container mx-auto px-4 py-8'>
          {/* Mobile/tablet: filter toggle row */}
          <div className='lg:hidden flex items-center justify-between mb-5'>
            <button
              type='button'
              onClick={() => setIsMobileFilterOpen(true)}
              className='flex items-center gap-2 border border-gray-100 rounded-md bg-white px-4 h-9 font-inter text-sm text-gray-700 hover:bg-gray-50 transition-colors'
            >
              <SlidersHorizontal size={15} aria-hidden='true' />
              Filters
            </button>
            <p className='font-inter text-sm text-gray-500'>
              <span className='font-semibold text-ink'>{ALL_CARS.length}</span>{' '}
              results
            </p>
          </div>

          <div className='flex items-start gap-6 xl:gap-8'>
            {/* Desktop sidebar � sticky, scrollable if taller than viewport */}
            <div className='hidden lg:block w-71.25 shrink-0 self-start sticky top-22'>
              <div className='bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5 max-h-[calc(100vh-104px)] overflow-y-auto'>
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>

            {/* Car grid + controls */}
            <div ref={gridSectionRef} className='flex-1 min-w-0'>
              {/* Result count + sort */}
              <div className='flex items-center justify-end lg:justify-between mb-5'>
                <p className='hidden lg:block font-inter text-sm text-gray-500'>
                  Showing{' '}
                  <span className='font-semibold text-ink'>
                    {ALL_CARS.length}
                  </span>{' '}
                  results
                </p>
                <div className='flex items-center gap-2'>
                  <span className='font-inter text-sm text-gray-500'>
                    Sort by:
                  </span>
                  <div className='relative'>
                    <select
                      aria-label='Sort results'
                      className='h-9 rounded-md border border-gray-100 px-3 pr-8 text-sm font-inter text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white'
                    >
                      <option>Newest First</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Mileage: Low to High</option>
                    </select>
                    <ChevronDown
                      size={13}
                      className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
                      aria-hidden='true'
                    />
                  </div>
                </div>
              </div>

              {/* Car grid: 1col mobile ? 2col tablet ? 3col xl */}
              <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5'>
                {visibleCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={TOTAL_PAGES}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
};
CarListContent.displayName = 'CarListContent';

export default CarListContent;
