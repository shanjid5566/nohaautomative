import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config';
import { CAR_TYPES } from '../../data/homeData';

// ─── TypeCard ─────────────────────────────────────────────────────────────────

const TypeCard = memo(({ name, count, bg, img }) => (
  <Link
    to={`${ROUTES.CAR_LIST}?category=${name.toLowerCase()}`}
    className={`relative rounded-lg overflow-hidden ${bg} block hover:scale-[1.02] transition-transform duration-200
      w-40 h-56 sm:w-48 sm:h-64 md:w-auto md:h-68 lg:h-72 md:flex-1`}
    aria-label={`Browse ${name} — ${count} cars available`}
  >
    {img && (
      <img
        src={img}
        alt={name}
        className='absolute inset-0 w-full h-full object-cover'
        loading='lazy'
      />
    )}
    <div
      className='absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/75'
      aria-hidden='true'
    />
    <div className='absolute bottom-0 left-0 right-0 p-5'>
      <p className='text-white/65 text-[13px] font-inter mb-1.25 leading-none'>
        {count} Cars
      </p>
      <p className='text-white font-semibold text-xl font-poppins leading-none'>
        {name}
      </p>
    </div>
  </Link>
));
TypeCard.displayName = 'TypeCard';

// ─── BrowseByType ─────────────────────────────────────────────────────────────

const BrowseByType = memo(() => (
  <section aria-labelledby='browse-type-heading' className='py-16 bg-white'>
    <div className='container mx-auto px-4 cen'>
      <h2
        id='browse-type-heading'
        className='font-poppins font-semibold text-ink text-[28px] mb-8 leading-none'
      >
        Browse by Type
      </h2>

      {/* Mobile: horizontal scroll — md+: flex row fills container */}
      <div
        className='flex gap-3 sm:gap-4 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 scroll-smooth'
        role='list'
        aria-label='Vehicle categories'
      >
        {CAR_TYPES.map((type) => (
          <div
            key={type.id}
            role='listitem'
            className='shrink-0 md:shrink md:flex-1'
          >
            <TypeCard
              name={type.name}
              count={type.count}
              bg={type.bg}
              img={type.img}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
));
BrowseByType.displayName = 'BrowseByType';

export default BrowseByType;
