import React, { memo } from 'react';
import { Calendar, Fuel, Gauge, Settings2 } from 'lucide-react';
import StatPill from './StatPill';

const CarSummarySection = memo(({ car }) => (
  <div className='bg-[#f9fafb] rounded-2xl p-6 mb-5 flex flex-col gap-5'>
    <h1 className='font-poppins font-medium text-[32px] text-[#0a0a0a] leading-tight'>
      {car.title}
    </h1>
    <p className='font-inter font-light text-base text-[#323232] leading-relaxed'>
      {car.description}
    </p>
    <p className='font-inter font-bold text-4xl text-[#171717] leading-10'>
      {car.price}
    </p>

    <div className='flex flex-wrap gap-3'>
      <StatPill icon={Calendar} label='Year' value={car.year} />
      <StatPill icon={Gauge} label='Mileage' value={car.mileage} />
      <StatPill icon={Fuel} label='Fuel' value={car.fuel} />
      <StatPill icon={Settings2} label='Transmission' value={car.transmission} />
    </div>
  </div>
));

CarSummarySection.displayName = 'CarSummarySection';

export default CarSummarySection;
