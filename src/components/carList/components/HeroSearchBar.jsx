import React, { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';
import { ROUTES } from '../../../config';
import {
  HERO_YEAR_OPTIONS,
  MAKE_OPTIONS,
  MODEL_OPTIONS,
  PRICE_RANGE_OPTS,
} from './constants';

const HeroSearchBar = memo(
  ({ initialMake, initialModel, initialYear, initialPrice }) => {
    const navigate = useNavigate();
    const [make, setMake] = useState(initialMake || '');
    const [model, setModel] = useState(initialModel || '');
    const [year, setYear] = useState(initialYear || '');
    const [price, setPrice] = useState(initialPrice || '');

    const handleSearch = useCallback(() => {
      const params = new URLSearchParams();
      if (make) params.set('make', make);
      if (model) params.set('model', model);
      if (year) params.set('year', year);
      if (price) params.set('price', price);
      navigate(
        `${ROUTES.CAR_LIST}${params.toString() ? '?' + params.toString() : ''}`,
      );
    }, [navigate, make, model, year, price]);

    const selectCls =
      'w-full h-11 bg-white rounded-md px-4 pr-9 text-sm font-inter text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40';

    return (
      <div className='bg-[rgba(255,255,255,0.12)] backdrop-blur-sm border border-white/5 rounded-xl p-3 grid grid-cols-2 gap-3 lg:flex lg:items-center w-full max-w-3xl'>
        <div className='relative flex-1 min-w-0'>
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            aria-label='Make'
            className={selectCls}
          >
            <option value=''>Make</option>
            {MAKE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none'
            aria-hidden='true'
          />
        </div>

        <div className='relative flex-1 min-w-0'>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            aria-label='Model'
            className={selectCls}
          >
            <option value=''>Model</option>
            {MODEL_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none'
            aria-hidden='true'
          />
        </div>

        <div className='relative flex-1 min-w-0'>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            aria-label='Year'
            className={selectCls}
          >
            <option value=''>Year</option>
            {HERO_YEAR_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none'
            aria-hidden='true'
          />
        </div>

        <div className='relative flex-1 min-w-0'>
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            aria-label='Price Range'
            className={selectCls}
          >
            <option value=''>Price Range</option>
            {PRICE_RANGE_OPTS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none'
            aria-hidden='true'
          />
        </div>

        <button
          type='button'
          onClick={handleSearch}
          className='col-span-2 lg:col-span-1 flex items-center justify-center gap-2 bg-primary text-white font-public-sans font-semibold text-sm px-7 py-3.5 rounded-md hover:bg-primary-dark transition-colors whitespace-nowrap shrink-0'
        >
          <Search size={15} aria-hidden='true' />
          Search
        </button>
      </div>
    );
  },
);

HeroSearchBar.displayName = 'HeroSearchBar';

export default HeroSearchBar;
