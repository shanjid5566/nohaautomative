import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  MapPin,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { ROUTES } from '../../config';
import { ALL_CARS } from '../../data/cars';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import CarCard from '../shared/CarCard';
import CtaSection from '../shared/CtaSection';

const MAKE_OPTIONS = ['BMW', 'Tesla', 'Toyota', 'Ford', 'Audi', 'Range Rover'];
const MODEL_OPTIONS = [
  'Civic',
  '3 Series',
  'A6',
  'Range Rover',
  'Mustang',
  'Model 3',
  'Sportage',
  'Tucson',
  'C-Class',
  'Corolla',
];
const HERO_YEAR_OPTIONS = ['2024', '2023', '2022', '2021', '2020'];
const PRICE_RANGE_OPTS = ['Under $20k', '$20k�$40k', '$40k�$60k', 'Over $60k'];

// --- Car data imported from src/data/cars.js ---------------------------------

const PRICE_RANGES = [
  { label: 'All Price', value: '' },
  { label: 'Under $10,000', value: 'under-10000' },
  { label: '$10,000 to $20,000', value: '10000-20000' },
  { label: '$20,000 to $40,000', value: '20000-40000' },
  { label: '$40,000 to $60,000', value: '40000-60000' },
  { label: 'Above $60,000', value: 'above-60000' },
];

const CATEGORIES = [
  { label: 'SUV', subItems: ['Compact SUV', 'Mid-size SUV', 'Mortars'] },
  { label: 'Sedan', subItems: [] },
  { label: 'Hatchback', subItems: [] },
  { label: 'Coupe', subItems: [] },
  { label: 'Convertible', subItems: [] },
];

const SEAT_OPTIONS = ['2 seat', '4 seat', '5 seat', '6 seat', 'Above 6'];
const FUEL_OPTIONS = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'LPG'];
const TRANSMISSION_OPTIONS = ['Manual', 'Automatic', 'Semi-Automatic'];
const CONDITION_OPTIONS = ['New', 'Used'];
const RANGE_OPTIONS = [
  'Any',
  '10,000 mi',
  '20,000 mi',
  '30,000 mi',
  '50,000 mi',
  '80,000 mi',
];
const ENGINE_OPTIONS = ['Any', '1.0L', '1.5L', '2.0L', '2.5L', '3.0L', '4.0L+'];
const YEAR_CHECKBOXES = [
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  'Under 2020',
];

// --- Hero Search Bar ---------------------------------------------------------

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

// --- Filter Sidebar -----------------------------------------------------------

const FilterSidebar = memo(({ filters, onFilterChange, initialCategory }) => {
  const [expandedCategory, setExpandedCategory] = useState(
    initialCategory
      ? initialCategory.charAt(0).toUpperCase() + initialCategory.slice(1)
      : 'SUV',
  );

  const toggleCategory = useCallback((label) => {
    setExpandedCategory((prev) => (prev === label ? null : label));
  }, []);

  const toggleCheck = useCallback(
    (key, value) => {
      const set = new Set(filters[key]);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      onFilterChange(key, Array.from(set));
    },
    [filters, onFilterChange],
  );

  return (
    <div className='w-full flex flex-col gap-0'>
      {/* Make */}
      <div className='mb-4'>
        <label className='block font-inter font-semibold text-[13px] text-ink mb-2'>
          Make
        </label>
        <div className='relative'>
          <select
            value={filters.make}
            onChange={(e) => onFilterChange('make', e.target.value)}
            aria-label='Make'
            className='w-full h-10 rounded-md border border-gray-100 px-3 pr-8 text-[13px] font-inter text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40'
          >
            <option value=''>Any Make</option>
            {MAKE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown
            size={13}
            className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
            aria-hidden='true'
          />
        </div>
      </div>

      {/* Model */}
      <div className='mb-4'>
        <label className='block font-inter font-semibold text-[13px] text-ink mb-2'>
          Model
        </label>
        <div className='relative'>
          <select
            value={filters.model}
            onChange={(e) => onFilterChange('model', e.target.value)}
            aria-label='Model'
            className='w-full h-10 rounded-md border border-gray-100 px-3 pr-8 text-[13px] font-inter text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40'
          >
            <option value=''>Any Model</option>
            {MODEL_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown
            size={13}
            className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
            aria-hidden='true'
          />
        </div>
      </div>

      <hr className='border-gray-100 mb-4' />

      {/* Location */}
      <div className='mb-5'>
        <label className='block font-inter font-semibold text-[13px] text-ink mb-2'>
          Location
        </label>
        <div className='relative'>
          <MapPin
            size={15}
            className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
            aria-hidden='true'
          />
          <input
            type='text'
            value={filters.location}
            onChange={(e) => onFilterChange('location', e.target.value)}
            placeholder='Search by location'
            aria-label='Search by location'
            className='w-full h-10 rounded-md border border-gray-100 pl-9 pr-3 text-[13px] font-inter text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40'
          />
        </div>
      </div>

      {/* Radius */}
      <div className='mb-5'>
        <label className='block font-inter font-semibold text-[13px] text-ink mb-2'>
          Radius
        </label>
        <input
          type='text'
          value={filters.radius}
          onChange={(e) => onFilterChange('radius', e.target.value)}
          placeholder='Radius'
          aria-label='Search radius'
          className='w-full h-10 rounded-md border border-gray-100 px-3 text-[13px] font-inter text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 mb-3'
        />
        {/* Map placeholder */}
        <div
          className='w-full h-45 rounded-lg bg-[#e8edf2] flex items-center justify-center'
          aria-label='Map area'
          role='img'
        >
          <div className='flex flex-col items-center gap-2 text-gray-400'>
            <MapPin size={28} aria-hidden='true' />
            <span className='font-inter text-xs'>Map</span>
          </div>
        </div>
      </div>

      <hr className='border-gray-100 mb-5' />

      {/* Price Range */}
      <div className='mb-5'>
        <p className='font-inter font-semibold text-[13px] text-ink mb-3'>
          Price Range
        </p>
        {/* Slider track */}
        {/* <div className='relative h-1.5 bg-gray-200 rounded-full mb-4'>
          <div
            className='absolute h-full bg-primary rounded-full'
            style={{ left: '40%', right: '20%' }}
          />
          <div
            className='absolute w-4 h-4 bg-white border-2 border-primary rounded-full -top-1.25 cursor-pointer shadow-sm'
            style={{ left: 'calc(40% - 8px)' }}
            aria-hidden='true'
          />
          <div
            className='absolute w-4 h-4 bg-white border-2 border-primary rounded-full -top-1.25 cursor-pointer shadow-sm'
            style={{ left: 'calc(80% - 8px)' }}
            aria-hidden='true'
          />
        </div> */}
        {/* <div className='flex gap-2 mb-4'>
          <input
            type='text'
            placeholder='Min price'
            value={filters.minPrice}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            aria-label='Minimum price'
            className='flex-1 h-9 rounded-md border border-gray-100 px-2 text-xs font-inter text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40'
          />
          <input
            type='text'
            placeholder='Max price'
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            aria-label='Maximum price'
            className='flex-1 h-9 rounded-md border border-gray-100 px-2 text-xs font-inter text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40'
          />
        </div> */}
        <div className='flex flex-col gap-2.5'>
          {PRICE_RANGES.map(({ label, value }) => (
            <label
              key={value}
              className='flex items-center gap-2 cursor-pointer'
              onClick={() => onFilterChange('priceRange', value)}
            >
              <input
                type='radio'
                name='priceRange'
                value={value}
                readOnly
                checked={filters.priceRange === value}
                className='accent-primary w-4 h-4 pointer-events-none'
              />
              <span className='font-inter text-[13px] text-gray-700'>
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className='border-gray-100 mb-5' />

      {/* Category */}
      {/* <div className='mb-5'>
        <p className='font-inter font-semibold text-[13px] text-ink mb-3'>
          Category
        </p>
        <div className='flex flex-col gap-1'>
          {CATEGORIES.map(({ label, subItems }) => {
            const isExpanded = expandedCategory === label;
            return (
              <div key={label}>
                <button
                  type='button'
                  onClick={() => toggleCategory(label)}
                  className='w-full flex items-center justify-between py-1.5 group'
                  aria-expanded={isExpanded}
                >
                  <span
                    className={`font-inter font-medium text-[13px] transition-colors ${
                      isExpanded
                        ? 'text-primary'
                        : 'text-gray-700 group-hover:text-primary'
                    }`}
                  >
                    {label}
                  </span>
                  {isExpanded ? (
                    <ChevronDown
                      size={14}
                      className='text-primary'
                      aria-hidden='true'
                    />
                  ) : (
                    <ChevronRight
                      size={14}
                      className='text-gray-400'
                      aria-hidden='true'
                    />
                  )}
                </button>
                {isExpanded && subItems.length > 0 && (
                  <div className='pl-3 pb-2 flex flex-col gap-2'>
                    {subItems.map((sub) => (
                      <label
                        key={sub}
                        className='flex items-center gap-2 cursor-pointer'
                      >
                        <input
                          type='checkbox'
                          checked={filters.subCategories.includes(sub)}
                          onChange={() => toggleCheck('subCategories', sub)}
                          className='accent-primary w-4 h-4 rounded'
                        />
                        <span className='font-inter text-xs text-gray-600'>
                          {sub}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div> */}

      {/* Mileage */}
      <div className='mb-5'>
        <p className='font-inter font-semibold text-[13px] text-ink mb-3'>
          Mileage
        </p>
        <div className='flex items-center gap-2'>
          <div className='flex-1'>
            <label className='block font-inter text-[11px] text-gray-400 mb-1'>
              From
            </label>
            <input
              type='number'
              min='0'
              value={filters.mileageFrom}
              onChange={(e) => onFilterChange('mileageFrom', e.target.value)}
              placeholder='e.g. 0'
              aria-label='Mileage from'
              className='w-full h-9 rounded-md border border-gray-100 px-2 text-xs font-inter text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40'
            />
          </div>
          <div className='flex-1'>
            <label className='block font-inter text-[11px] text-gray-400 mb-1'>
              To
            </label>
            <input
              type='number'
              min='0'
              value={filters.mileageTo}
              onChange={(e) => onFilterChange('mileageTo', e.target.value)}
              placeholder='e.g. 50000'
              aria-label='Mileage to'
              className='w-full h-9 rounded-md border border-gray-100 px-2 text-xs font-inter text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40'
            />
          </div>
        </div>
      </div>

      {/* Seat */}
      <div className='mb-5'>
        <p className='font-inter font-semibold text-[13px] text-ink mb-3'>
          Seat
        </p>
        <div className='flex flex-col gap-2.5'>
          {SEAT_OPTIONS.map((opt) => (
            <label
              key={opt}
              onClick={() => onFilterChange('seats', opt)}
              className='flex items-center gap-2 cursor-pointer'
            >
              <input
                type='radio'
                name='seat'
                readOnly
                checked={filters.seats === opt}
                className='accent-primary w-4 h-4 pointer-events-none'
              />
              <span className='font-inter text-[13px] text-gray-700'>
                {opt}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Engine Size */}
      <div className='mb-5'>
        <p className='font-inter font-semibold text-[13px] text-ink mb-3'>
          Engine Size
        </p>
        <div className='flex items-center gap-2'>
          <div className='flex-1'>
            <label className='block font-inter text-[11px] text-gray-400 mb-1'>
              From
            </label>
            <input
              type='number'
              min='0'
              step='0.1'
              value={filters.engineFrom}
              onChange={(e) => onFilterChange('engineFrom', e.target.value)}
              placeholder='e.g. 1.0'
              aria-label='Engine size from'
              className='w-full h-9 rounded-md border border-gray-100 px-2 text-xs font-inter text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40'
            />
          </div>
          <div className='flex-1'>
            <label className='block font-inter text-[11px] text-gray-400 mb-1'>
              To
            </label>
            <input
              type='number'
              min='0'
              step='0.1'
              value={filters.engineTo}
              onChange={(e) => onFilterChange('engineTo', e.target.value)}
              placeholder='e.g. 4.0'
              aria-label='Engine size to'
              className='w-full h-9 rounded-md border border-gray-100 px-2 text-xs font-inter text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40'
            />
          </div>
        </div>
      </div>

      {/* Fuel Type */}
      <div className='mb-5'>
        <p className='font-inter font-semibold text-[13px] text-ink mb-3'>
          Fuel Type
        </p>
        <div className='flex flex-col gap-2.5'>
          {FUEL_OPTIONS.map((opt) => (
            <label
              key={opt}
              onClick={() => onFilterChange('fuelTypes', opt)}
              className='flex items-center gap-2 cursor-pointer'
            >
              <input
                type='radio'
                name='fuelType'
                readOnly
                checked={filters.fuelTypes === opt}
                className='accent-primary w-4 h-4 pointer-events-none'
              />
              <span className='font-inter text-[13px] text-gray-700'>
                {opt}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission Type */}
      <div className='mb-5'>
        <p className='font-inter font-semibold text-[13px] text-ink mb-3'>
          Transmission Type
        </p>
        <div className='flex flex-col gap-2.5'>
          {TRANSMISSION_OPTIONS.map((opt) => (
            <label
              key={opt}
              onClick={() => onFilterChange('transmissionTypes', opt)}
              className='flex items-center gap-2 cursor-pointer'
            >
              <input
                type='radio'
                name='transmissionType'
                readOnly
                checked={filters.transmissionTypes === opt}
                className='accent-primary w-4 h-4 pointer-events-none'
              />
              <span className='font-inter text-[13px] text-gray-700'>
                {opt}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div className='mb-5'>
        <p className='font-inter font-semibold text-[13px] text-ink mb-3'>
          Condition
        </p>
        <div className='flex flex-col gap-2.5'>
          {CONDITION_OPTIONS.map((opt) => (
            <label
              key={opt}
              onClick={() => onFilterChange('conditions', opt)}
              className='flex items-center gap-2 cursor-pointer'
            >
              <input
                type='radio'
                name='condition'
                readOnly
                checked={filters.conditions === opt}
                className='accent-primary w-4 h-4 pointer-events-none'
              />
              <span className='font-inter text-[13px] text-gray-700'>
                {opt}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Year */}
      <div className='mb-1'>
        <p className='font-inter font-semibold text-[13px] text-ink mb-3'>
          Year
        </p>
        <div className='flex flex-col gap-2.5 mb-4'>
          {YEAR_CHECKBOXES.map((opt) => (
            <label
              key={opt}
              onClick={() => onFilterChange('years', opt)}
              className='flex items-center gap-2 cursor-pointer'
            >
              <input
                type='radio'
                name='year'
                readOnly
                checked={filters.years === opt}
                className='accent-primary w-4 h-4 pointer-events-none'
              />
              <span className='font-inter text-[13px] text-gray-700'>
                {opt}
              </span>
            </label>
          ))}
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex-1'>
            <label className='block font-inter text-[11px] text-gray-400 mb-1'>
              From
            </label>
            <input
              type='number'
              min='1900'
              max='2025'
              value={filters.yearFrom}
              onChange={(e) => onFilterChange('yearFrom', e.target.value)}
              placeholder='e.g. 2018'
              aria-label='Year from'
              className='w-full h-9 rounded-md border border-gray-100 px-2 text-xs font-inter text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40'
            />
          </div>
          <div className='flex-1'>
            <label className='block font-inter text-[11px] text-gray-400 mb-1'>
              To
            </label>
            <input
              type='number'
              min='1900'
              max='2025'
              value={filters.yearTo}
              onChange={(e) => onFilterChange('yearTo', e.target.value)}
              placeholder='e.g. 2025'
              aria-label='Year to'
              className='w-full h-9 rounded-md border border-gray-100 px-2 text-xs font-inter text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40'
            />
          </div>
        </div>
      </div>
    </div>
  );
});
FilterSidebar.displayName = 'FilterSidebar';

// --- Pagination ---------------------------------------------------------------

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

// --- Main Page ----------------------------------------------------------------

const INITIAL_FILTERS = {
  make: '',
  model: '',
  location: '',
  radius: '',
  priceRange: '',
  minPrice: '',
  maxPrice: '',
  subCategories: [],
  mileageFrom: '',
  mileageTo: '',
  seats: '',
  engineFrom: '',
  engineTo: '',
  fuelTypes: '',
  transmissionTypes: '',
  conditions: '',
  years: '',
  yearFrom: '',
  yearTo: '',
};

const CARS_PER_PAGE = 15;
const TOTAL_PAGES = 10;

const CarListContent = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
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

  return (
    <div className='min-h-screen font-inter bg-[#f7f8fa]'>
      <Navbar />

      {/* -- Mobile filter drawer � portal, z-[55]/z-[60] above fixed navbar z-50 -- */}
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
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                initialCategory={category}
              />
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
                  initialCategory={category}
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
