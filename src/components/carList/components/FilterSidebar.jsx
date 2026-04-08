import React, { memo } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import {
  CONDITION_OPTIONS,
  FUEL_OPTIONS,
  MAKE_OPTIONS,
  MODEL_OPTIONS,
  PRICE_RANGES,
  SEAT_OPTIONS,
  TRANSMISSION_OPTIONS,
  YEAR_CHECKBOXES,
} from './constants';

const FilterSidebar = memo(({ filters, onFilterChange }) => {
  return (
    <div className='w-full flex flex-col gap-0'>
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

      <div className='mb-5'>
        <p className='font-inter font-semibold text-[13px] text-ink mb-3'>
          Price Range
        </p>
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

export default FilterSidebar;
