import React, { memo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

const Pagination = memo(({ currentPage, totalPages, onPageChange }) => {
  const pages = [1, 2, 3];

  return (
    <nav
      className='flex items-center justify-center gap-1 mt-8'
      aria-label='Pagination'
    >
      <button
        type='button'
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label='First page'
        className='w-9 h-9 flex items-center justify-center rounded-full border border-gray-100 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
      >
        <ChevronsLeft size={15} aria-hidden='true' />
      </button>
      <button
        type='button'
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label='Previous page'
        className='w-9 h-9 flex items-center justify-center rounded-full border border-gray-100 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
      >
        <ChevronLeft size={15} aria-hidden='true' />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type='button'
          onClick={() => onPageChange(p)}
          aria-label={`Page ${p}`}
          aria-current={currentPage === p ? 'page' : undefined}
          className={`w-9 h-9 flex items-center justify-center rounded-full font-inter text-[13px] font-medium transition-colors ${
            currentPage === p
              ? 'bg-primary text-white shadow-sm'
              : 'border border-gray-100 bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          {p}
        </button>
      ))}

      <span className='px-1 font-inter text-[13px] text-gray-400'>...</span>

      <button
        type='button'
        onClick={() => onPageChange(totalPages)}
        aria-label={`Page ${totalPages}`}
        className='w-9 h-9 flex items-center justify-center rounded-full border border-gray-100 bg-white font-inter text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors'
      >
        {totalPages}
      </button>

      <button
        type='button'
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label='Next page'
        className='w-9 h-9 flex items-center justify-center rounded-full border border-gray-100 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
      >
        <ChevronRight size={15} aria-hidden='true' />
      </button>
    </nav>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;
