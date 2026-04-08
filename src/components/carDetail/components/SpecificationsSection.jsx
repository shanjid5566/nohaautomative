import React, { memo, useMemo } from 'react';
import SpecRow from './SpecRow';

const SpecificationsSection = memo(({ car }) => {
  const [col0, col1, col2] = useMemo(() => {
    const specs = [
      { label: 'Make', value: car.make },
      { label: 'Body Type', value: car.bodyType },
      { label: 'Model', value: car.model },
      { label: 'Engine', value: car.engine },
      { label: 'Exterior Colour', value: car.exteriorColour },
      { label: 'Horsepower', value: car.horsepower },
      { label: 'Colour', value: car.colour },
      { label: 'Doors', value: car.doors },
      { label: 'Condition', value: car.condition },
      { label: 'Seats', value: car.seats },
    ];

    return [
      specs.filter((_, i) => i % 3 === 0),
      specs.filter((_, i) => i % 3 === 1),
      specs.filter((_, i) => i % 3 === 2),
    ];
  }, [car]);

  return (
    <div className='bg-[#f9fafb] rounded-2xl px-6 pt-6 pb-4 mb-5'>
      <h2 className='font-inter font-medium text-[32px] text-[#0a0a0a] mb-6'>
        Specifications
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12'>
        <div className='flex flex-col'>
          {col0.map((s) => (
            <SpecRow key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
        <div className='flex flex-col'>
          {col1.map((s) => (
            <SpecRow key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
        <div className='flex flex-col'>
          {col2.map((s) => (
            <SpecRow key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
      </div>
    </div>
  );
});

SpecificationsSection.displayName = 'SpecificationsSection';

export default SpecificationsSection;
