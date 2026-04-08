import React, { memo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';
import { ROUTES } from '../../config';
import { SEARCH_OPTIONS } from '../../data/homeData';

// ─── SearchSelect — reusable dropdown (DRY: replaces 4 identical copy-pastes) ──

const SearchSelect = memo(({ label, value, onChange, options }) => (
  <div className='relative flex-1 min-w-0'>
    <select
      value={value}
      onChange={onChange}
      aria-label={label}
      className='w-full h-12 bg-white rounded-md px-4 pr-9 text-base font-inter text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40'
    >
      <option value=''>{label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <ChevronDown
      size={15}
      className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none'
      aria-hidden='true'
    />
  </div>
));
SearchSelect.displayName = 'SearchSelect';

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero = memo(() => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
  });

  // Single handler factory — eliminates 4 separate onChange handlers
  const setFilter = useCallback(
    (key) => (e) => setFilters((prev) => ({ ...prev, [key]: e.target.value })),
    [],
  );

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    const qs = params.toString();
    navigate(`${ROUTES.CAR_LIST}${qs ? '?' + qs : ''}`);
  }, [navigate, filters]);

  return (
    <section
      aria-label='Car search hero'
      className='relative min-h-160 lg:min-h-160 flex items-center justify-center overflow-hidden'
    >
      {/* Background image */}
      <img
        src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1280&q=60&auto=format'
        srcSet='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=640&q=55&auto=format 640w, https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=960&q=60&auto=format 960w, https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1280&q=60&auto=format 1280w'
        sizes='100vw'
        alt=''
        aria-hidden='true'
        className='absolute inset-0 w-full h-full object-cover pointer-events-none'
        loading='eager'
        decoding='async'
        fetchPriority='high'
      />
      {/* Light overlay — keeps text readable while image stays vivid */}
      <div
        className='absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/50 pointer-events-none'
        aria-hidden='true'
      />

      <div className='relative z-10 w-full container mx-auto px-4 py-14 sm:py-20 lg:py-25 text-center'>
        <h1 className='font-poppins font-semibold text-[clamp(2rem,6vw,4rem)] lg:text-[64px] leading-[1.15] text-white mb-4 sm:mb-5 tracking-tight'>
          Find Your <span className='text-primary'>Dream</span> Car
        </h1>
        <p className='font-poppins font-normal text-sm sm:text-base lg:text-xl text-white/80 mb-8 sm:mb-10 max-w-150 mx-auto leading-relaxed'>
          The UK&apos;s most trusted marketplace for buying and selling premium
          vehicles
        </p>

        {/* Search bar — 2-col grid on mobile, flex row on lg+ */}
        <div
          role='search'
          aria-label='Search for cars'
          className='bg-[rgba(255,255,255,0.10)] backdrop-blur-sm rounded-xl p-3 grid grid-cols-2 lg:flex items-center gap-3 w-full max-w-4xl mx-auto'
        >
          <SearchSelect
            label='Make'
            value={filters.make}
            onChange={setFilter('make')}
            options={SEARCH_OPTIONS.make}
          />
          <SearchSelect
            label='Model'
            value={filters.model}
            onChange={setFilter('model')}
            options={SEARCH_OPTIONS.model}
          />
          <SearchSelect
            label='Year'
            value={filters.year}
            onChange={setFilter('year')}
            options={SEARCH_OPTIONS.year}
          />
          <SearchSelect
            label='Price Range'
            value={filters.price}
            onChange={setFilter('price')}
            options={SEARCH_OPTIONS.price}
          />
          <button
            type='button'
            onClick={handleSearch}
            className='col-span-2 lg:col-auto flex items-center justify-center gap-2 bg-primary text-white font-public-sans font-semibold text-sm px-7 py-3.5 rounded-md hover:bg-primary-dark transition-colors whitespace-nowrap shrink-0'
          >
            <Search size={15} aria-hidden='true' />
            Search
          </button>
        </div>
      </div>
    </section>
  );
});
Hero.displayName = 'Hero';

export default Hero;
