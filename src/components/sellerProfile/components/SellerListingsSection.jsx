import React, { memo } from 'react';
import { ChevronDown } from 'lucide-react';
import { ALL_CARS } from '../../../data/cars';
import { usePageLoadState } from '../../../hooks/usePageLoadState';
import CarCard from '../../shared/CarCard';
import PageStateView from '../../shared/PageStateView';
import Pagination from '../../shared/Pagination';

const SellerListingsSection = memo(
  ({ listingsRef, currentPage, totalPages, onPageChange }) => {
    const { isLoading, retry } = usePageLoadState();
    const isEmpty = !isLoading && ALL_CARS.length === 0;

    return (
      <div ref={listingsRef} className='bg-[#f7f8fa] pt-8 pb-16'>
        <div className='container mx-auto px-4'>
          {(isLoading || isEmpty) && (
            <PageStateView
              status={isLoading ? 'loading' : 'empty'}
              variant='list'
              onRetry={retry}
              emptyTitle='No seller listings'
              emptyDescription='No cars are listed by this seller right now.'
            />
          )}

          {!isLoading && !isEmpty && (
            <div className='flex items-start gap-8'>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center justify-between mb-5'>
                  <p className='font-inter text-sm text-gray-500'>
                    Showing{' '}
                    <span className='font-semibold text-ink'>{ALL_CARS.length}</span>{' '}
                    results
                  </p>
                  <div className='flex items-center gap-2'>
                    <span className='font-inter text-[13px] text-gray-500'>
                      Sort by:
                    </span>
                    <div className='relative'>
                      <select
                        aria-label='Sort results'
                        className='h-9 rounded-md border border-gray-200 px-3 pr-8 text-[13px] font-inter text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white'
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

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5'>
                  {ALL_CARS.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

SellerListingsSection.displayName = 'SellerListingsSection';

export default SellerListingsSection;
