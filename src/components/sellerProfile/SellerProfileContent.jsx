import React, { memo, useState, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, ChevronDown } from 'lucide-react';
import { ALL_CARS } from '../../data/cars';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import CarCard from '../shared/CarCard';
import CtaSection from '../shared/CtaSection';
import { ROUTES } from '../../config';
import Pagination from '../shared/Pagination';

// ─── Hero image & seller data ────────────────────────────────────────────────

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&h=380&fit=crop&q=85';

const AVATAR_IMAGE =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces&q=80';

const SELLER_DATA = {
  default: {
    name: "Noha's Automotived",
    rating: 4.6,
    reviewCount: 66,
    address: '123 4th Avenue North, Birmingham, AL 35203, USA',
    description: [
      'Welcome to [Your Car Shop Name], your trusted destination for quality cars. With years of experience in the automobile industry, we are dedicated to helping you find the perfect vehicle that fits your lifestyle and budget.',
      'Our mission is to provide reliable, affordable, and high-quality cars with transparent deals and excellent customer service. Whether you are looking for a brand-new car or a certified pre-owned vehicle, we ensure a smooth buying experience from start to finish.',
      'At [Your Car Shop Name], we believe in trust, transparency, and customer satisfaction. Our team is always ready to guide you, answer your questions, and make sure you drive away happy.',
      'Drive your dream car today with confidence!',
    ],
  },
};

// ─── Constants ────────────────────────────────────────────────────────────────

// const MAKE_OPTIONS = ['BMW', 'Tesla', 'Toyota', 'Ford', 'Audi', 'Range Rover'];
// const MODEL_OPTIONS = ['3 Series', 'Model 3', 'RAV4', 'Mustang', 'A4', 'Sport'];

// const PRICE_RANGES = [
//   { label: 'All Price', value: '' },
//   { label: 'Under $20', value: 'under-20' },
//   { label: '$25 to $100', value: '25-100' },
//   { label: '$100 to $300', value: '100-300' },
//   { label: '$300 to $500', value: '300-500' },
//   { label: '$500 to $1,000', value: '500-1000' },
//   { label: '$1,000 to $10,000', value: '1000-10000' },
// ];

// const CATEGORIES = [
//   { label: 'SUV', subItems: ['Compact SUV', 'Mid-size SUV', 'Mortars'] },
//   { label: 'Sedan', subItems: [] },
//   { label: 'Hatchback', subItems: [] },
//   { label: 'Coupe', subItems: [] },
//   { label: 'Convertible', subItems: [] },
// ];

// const SEAT_OPTIONS = [
//   '2-seater',
//   '4-seater',
//   '5-seater',
//   '6-7 seater',
//   '8-12 seater',
// ];
// const FUEL_OPTIONS = ['Petrol', 'Diesel', 'Electric (EV)', 'Hybrid'];
// const RANGE_OPTIONS = [
//   'Any',
//   '10,000 mi',
//   '20,000 mi',
//   '30,000 mi',
//   '50,000 mi',
//   '80,000 mi',
// ];
// const ENGINE_OPTIONS = ['Any', '1.0L', '1.5L', '2.0L', '2.5L', '3.0L', '4.0L+'];
// const YEAR_OPTIONS = [
//   'Any',
//   '2024',
//   '2023',
//   '2022',
//   '2021',
//   '2020',
//   '2019',
//   '2018',
// ];

const TOTAL_PAGES = 5; // decorative pagination matching Figma design (« < 1 2 3 ... 5 >)

// const INITIAL_FILTERS = {
//   make: '',
//   model: '',
//   location: '',
//   radius: '',
//   priceRange: '',
//   minPrice: '',
//   maxPrice: '',
//   subCategories: [],
//   mileageFrom: 'Any',
//   mileageTo: 'Any',
//   seats: [],
//   engineFrom: 'Any',
//   engineTo: 'Any',
//   fuelTypes: [],
//   yearFrom: 'Any',
//   yearTo: 'Any',
// };

// ─── Filter Sidebar ───────────────────────────────────────────────────────────

// const FilterSidebar = memo(({ filters, onFilterChange }) => {
//   const [expandedCategory, setExpandedCategory] = useState('SUV');

//   const toggleCategory = useCallback((label) => {
//     setExpandedCategory((prev) => (prev === label ? null : label));
//   }, []);

//   const toggleCheck = useCallback(
//     (key, value) => {
//       const set = new Set(filters[key]);
//       if (set.has(value)) set.delete(value);
//       else set.add(value);
//       onFilterChange(key, Array.from(set));
//     },
//     [filters, onFilterChange],
//   );

//   return (
//     <aside className='w-71.25 shrink-0 flex flex-col gap-0 bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5 self-start'>
//       {/* Make */}
//       <div className='mb-4'>
//         <label className='block font-inter font-semibold text-[13px] text-ink mb-2'>
//           Make
//         </label>
//         <div className='relative'>
//           <select
//             value={filters.make}
//             onChange={(e) => onFilterChange('make', e.target.value)}
//             aria-label='Make'
//             className='w-full h-10 rounded-md border border-gray-200 px-3 pr-8 text-[13px] font-inter text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40'
//           >
//             <option value=''>Any Make</option>
//             {MAKE_OPTIONS.map((o) => (
//               <option key={o} value={o}>
//                 {o}
//               </option>
//             ))}
//           </select>
//           <ChevronDown
//             size={13}
//             className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
//             aria-hidden='true'
//           />
//         </div>
//       </div>

//       {/* Model */}
//       <div className='mb-4'>
//         <label className='block font-inter font-semibold text-[13px] text-ink mb-2'>
//           Model
//         </label>
//         <div className='relative'>
//           <select
//             value={filters.model}
//             onChange={(e) => onFilterChange('model', e.target.value)}
//             aria-label='Model'
//             className='w-full h-10 rounded-md border border-gray-200 px-3 pr-8 text-[13px] font-inter text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40'
//           >
//             <option value=''>Any Model</option>
//             {MODEL_OPTIONS.map((o) => (
//               <option key={o} value={o}>
//                 {o}
//               </option>
//             ))}
//           </select>
//           <ChevronDown
//             size={13}
//             className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
//             aria-hidden='true'
//           />
//         </div>
//       </div>

//       <hr className='border-gray-100 mb-4' />

//       {/* Location */}
//       <div className='mb-5'>
//         <label className='block font-inter font-semibold text-[13px] text-ink mb-2'>
//           Location
//         </label>
//         <div className='relative'>
//           <MapPin
//             size={15}
//             className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
//             aria-hidden='true'
//           />
//           <input
//             type='text'
//             value={filters.location}
//             onChange={(e) => onFilterChange('location', e.target.value)}
//             placeholder='Search by location'
//             aria-label='Search by location'
//             className='w-full h-10 rounded-md border border-gray-200 pl-9 pr-3 text-[13px] font-inter text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40'
//           />
//         </div>
//       </div>

//       {/* Radius */}
//       <div className='mb-5'>
//         <label className='block font-inter font-semibold text-[13px] text-ink mb-2'>
//           Radius
//         </label>
//         <input
//           type='text'
//           value={filters.radius}
//           onChange={(e) => onFilterChange('radius', e.target.value)}
//           placeholder='Radius'
//           aria-label='Search radius'
//           className='w-full h-10 rounded-md border border-gray-200 px-3 text-[13px] font-inter text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 mb-3'
//         />
//         <div
//           className='w-full h-45 rounded-lg bg-[#e8edf2] flex items-center justify-center'
//           aria-label='Map area'
//           role='img'
//         >
//           <div className='flex flex-col items-center gap-2 text-gray-400'>
//             <MapPin size={28} aria-hidden='true' />
//             <span className='font-inter text-xs'>Map</span>
//           </div>
//         </div>
//       </div>

//       <hr className='border-gray-100 mb-5' />

//       {/* Price Range */}
//       <div className='mb-5'>
//         <p className='font-inter font-semibold text-[13px] text-ink mb-3'>
//           Price Range
//         </p>
//         <div className='relative h-1.5 bg-gray-200 rounded-full mb-4'>
//           <div
//             className='absolute h-full bg-primary rounded-full'
//             style={{ left: '40%', right: '20%' }}
//           />
//           <div
//             className='absolute w-4 h-4 bg-white border-2 border-primary rounded-full -top-1.25 cursor-pointer shadow-sm'
//             style={{ left: 'calc(40% - 8px)' }}
//             aria-hidden='true'
//           />
//           <div
//             className='absolute w-4 h-4 bg-white border-2 border-primary rounded-full -top-1.25 cursor-pointer shadow-sm'
//             style={{ left: 'calc(80% - 8px)' }}
//             aria-hidden='true'
//           />
//         </div>
//         <div className='flex gap-2 mb-4'>
//           <input
//             type='text'
//             placeholder='Min price'
//             value={filters.minPrice}
//             onChange={(e) => onFilterChange('minPrice', e.target.value)}
//             aria-label='Minimum price'
//             className='flex-1 h-9 rounded-md border border-gray-200 px-2 text-xs font-inter text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40'
//           />
//           <input
//             type='text'
//             placeholder='Max price'
//             value={filters.maxPrice}
//             onChange={(e) => onFilterChange('maxPrice', e.target.value)}
//             aria-label='Maximum price'
//             className='flex-1 h-9 rounded-md border border-gray-200 px-2 text-xs font-inter text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40'
//           />
//         </div>
//         <div className='flex flex-col gap-2.5'>
//           {PRICE_RANGES.map(({ label, value }) => (
//             <label
//               key={value}
//               className='flex items-center gap-2 cursor-pointer'
//             >
//               <input
//                 type='radio'
//                 name='spPriceRange'
//                 value={value}
//                 checked={filters.priceRange === value}
//                 onChange={() => onFilterChange('priceRange', value)}
//                 className='accent-primary w-4 h-4'
//               />
//               <span className='font-inter text-[13px] text-gray-700'>
//                 {label}
//               </span>
//             </label>
//           ))}
//         </div>
//       </div>

//       <hr className='border-gray-100 mb-5' />

//       {/* Category */}
//       <div className='mb-5'>
//         <p className='font-inter font-semibold text-[13px] text-ink mb-3'>
//           Category
//         </p>
//         <div className='flex flex-col gap-1'>
//           {CATEGORIES.map(({ label, subItems }) => {
//             const isExpanded = expandedCategory === label;
//             return (
//               <div key={label}>
//                 <button
//                   type='button'
//                   onClick={() => toggleCategory(label)}
//                   className='w-full flex items-center justify-between py-1.5 group'
//                   aria-expanded={isExpanded}
//                 >
//                   <span
//                     className={`font-inter font-medium text-[13px] transition-colors ${isExpanded ? 'text-primary' : 'text-gray-700 group-hover:text-primary'}`}
//                   >
//                     {label}
//                   </span>
//                   {isExpanded ? (
//                     <ChevronDown
//                       size={14}
//                       className='text-primary'
//                       aria-hidden='true'
//                     />
//                   ) : (
//                     <ChevronRight
//                       size={14}
//                       className='text-gray-400'
//                       aria-hidden='true'
//                     />
//                   )}
//                 </button>
//                 {isExpanded && subItems.length > 0 && (
//                   <div className='pl-3 pb-2 flex flex-col gap-2'>
//                     {subItems.map((sub) => (
//                       <label
//                         key={sub}
//                         className='flex items-center gap-2 cursor-pointer'
//                       >
//                         <input
//                           type='checkbox'
//                           checked={filters.subCategories.includes(sub)}
//                           onChange={() => toggleCheck('subCategories', sub)}
//                           className='accent-primary w-4 h-4 rounded'
//                         />
//                         <span className='font-inter text-xs text-gray-600'>
//                           {sub}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Mileage */}
//       <div className='mb-5'>
//         <p className='font-inter font-semibold text-[13px] text-ink mb-3'>
//           Mileage
//         </p>
//         <div className='flex items-center gap-2'>
//           <div className='flex-1'>
//             <label className='block font-inter text-[11px] text-gray-400 mb-1'>
//               From
//             </label>
//             <div className='relative'>
//               <select
//                 value={filters.mileageFrom}
//                 onChange={(e) => onFilterChange('mileageFrom', e.target.value)}
//                 aria-label='Mileage from'
//                 className='w-full h-9 rounded-md border border-gray-200 px-2 pr-7 text-xs font-inter text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40'
//               >
//                 {RANGE_OPTIONS.map((o) => (
//                   <option key={o} value={o}>
//                     {o}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown
//                 size={12}
//                 className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
//                 aria-hidden='true'
//               />
//             </div>
//           </div>
//           <div className='flex-1'>
//             <label className='block font-inter text-[11px] text-gray-400 mb-1'>
//               To
//             </label>
//             <div className='relative'>
//               <select
//                 value={filters.mileageTo}
//                 onChange={(e) => onFilterChange('mileageTo', e.target.value)}
//                 aria-label='Mileage to'
//                 className='w-full h-9 rounded-md border border-gray-200 px-2 pr-7 text-xs font-inter text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40'
//               >
//                 {RANGE_OPTIONS.map((o) => (
//                   <option key={o} value={o}>
//                     {o}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown
//                 size={12}
//                 className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
//                 aria-hidden='true'
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Seat */}
//       <div className='mb-5'>
//         <p className='font-inter font-semibold text-[13px] text-ink mb-3'>
//           Seat
//         </p>
//         <div className='flex flex-col gap-2.5'>
//           {SEAT_OPTIONS.map((opt) => (
//             <label key={opt} className='flex items-center gap-2 cursor-pointer'>
//               <input
//                 type='checkbox'
//                 checked={filters.seats.includes(opt)}
//                 onChange={() => toggleCheck('seats', opt)}
//                 className='accent-primary w-4 h-4 rounded'
//               />
//               <span className='font-inter text-[13px] text-gray-700'>
//                 {opt}
//               </span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Engine Size */}
//       <div className='mb-5'>
//         <p className='font-inter font-semibold text-[13px] text-ink mb-3'>
//           Engine Size
//         </p>
//         <div className='flex items-center gap-2'>
//           <div className='flex-1'>
//             <label className='block font-inter text-[11px] text-gray-400 mb-1'>
//               From
//             </label>
//             <div className='relative'>
//               <select
//                 value={filters.engineFrom}
//                 onChange={(e) => onFilterChange('engineFrom', e.target.value)}
//                 aria-label='Engine size from'
//                 className='w-full h-9 rounded-md border border-gray-200 px-2 pr-7 text-xs font-inter text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40'
//               >
//                 {ENGINE_OPTIONS.map((o) => (
//                   <option key={o} value={o}>
//                     {o}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown
//                 size={12}
//                 className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
//                 aria-hidden='true'
//               />
//             </div>
//           </div>
//           <div className='flex-1'>
//             <label className='block font-inter text-[11px] text-gray-400 mb-1'>
//               To
//             </label>
//             <div className='relative'>
//               <select
//                 value={filters.engineTo}
//                 onChange={(e) => onFilterChange('engineTo', e.target.value)}
//                 aria-label='Engine size to'
//                 className='w-full h-9 rounded-md border border-gray-200 px-2 pr-7 text-xs font-inter text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40'
//               >
//                 {ENGINE_OPTIONS.map((o) => (
//                   <option key={o} value={o}>
//                     {o}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown
//                 size={12}
//                 className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
//                 aria-hidden='true'
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Fuel Type */}
//       <div className='mb-5'>
//         <p className='font-inter font-semibold text-[13px] text-ink mb-3'>
//           Fuel Type
//         </p>
//         <div className='flex flex-col gap-2.5'>
//           {FUEL_OPTIONS.map((opt) => (
//             <label key={opt} className='flex items-center gap-2 cursor-pointer'>
//               <input
//                 type='checkbox'
//                 checked={filters.fuelTypes.includes(opt)}
//                 onChange={() => toggleCheck('fuelTypes', opt)}
//                 className='accent-primary w-4 h-4 rounded'
//               />
//               <span className='font-inter text-[13px] text-gray-700'>
//                 {opt}
//               </span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Year */}
//       <div className='mb-1'>
//         <p className='font-inter font-semibold text-[13px] text-ink mb-3'>
//           Year
//         </p>
//         <div className='flex items-center gap-2'>
//           <div className='flex-1'>
//             <label className='block font-inter text-[11px] text-gray-400 mb-1'>
//               From
//             </label>
//             <div className='relative'>
//               <select
//                 value={filters.yearFrom}
//                 onChange={(e) => onFilterChange('yearFrom', e.target.value)}
//                 aria-label='Year from'
//                 className='w-full h-9 rounded-md border border-gray-200 px-2 pr-7 text-xs font-inter text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40'
//               >
//                 {YEAR_OPTIONS.map((o) => (
//                   <option key={o} value={o}>
//                     {o}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown
//                 size={12}
//                 className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
//                 aria-hidden='true'
//               />
//             </div>
//           </div>
//           <div className='flex-1'>
//             <label className='block font-inter text-[11px] text-gray-400 mb-1'>
//               To
//             </label>
//             <div className='relative'>
//               <select
//                 value={filters.yearTo}
//                 onChange={(e) => onFilterChange('yearTo', e.target.value)}
//                 aria-label='Year to'
//                 className='w-full h-9 rounded-md border border-gray-200 px-2 pr-7 text-xs font-inter text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40'
//               >
//                 {YEAR_OPTIONS.map((o) => (
//                   <option key={o} value={o}>
//                     {o}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown
//                 size={12}
//                 className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
//                 aria-hidden='true'
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// });
// FilterSidebar.displayName = 'FilterSidebar';

// ─── Main Component ───────────────────────────────────────────────────────────

const SellerProfileContent = () => {
  const { id } = useParams();
  const seller = SELLER_DATA[id] || SELLER_DATA.default;

  // const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const listingsRef = useRef(null);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    listingsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  return (
    <div className='min-h-screen font-inter bg-white'>
      <Navbar />

      <main>
        {/* ── Hero Banner — full-width real car photo ───────────────── */}
        <section
          className='relative w-full h-80 overflow-hidden'
          aria-label='Seller hero'
        >
          <img
            src={HERO_IMAGE}
            alt='Seller banner'
            className='w-full h-full object-cover object-center'
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.classList.add(
                'bg-gradient-to-r',
                'from-[#0c0c1a]',
                'to-[#1a1030]',
              );
            }}
          />
          {/* subtle bottom fade */}
          <div className='absolute bottom-0 left-0 right-0 h-16 bg-linear-to-b from-transparent to-white/20 pointer-events-none' />
        </section>

        {/* ── Seller Profile Section ────────────────────────────────── */}
        <section className='bg-white pt-0 pb-8'>
          <div className='container mx-auto px-4'>
            {/* Avatar — overlaps hero by -40px */}
            <div className='-mt-10 mb-4 relative z-10'>
              <div className='w-20 h-20 rounded-full border-4 border-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] overflow-hidden'>
                <img
                  src={AVATAR_IMAGE}
                  alt={seller.name}
                  className='w-full h-full object-cover'
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add(
                      'bg-[rgba(108,59,255,0.15)]',
                      'flex',
                      'items-center',
                      'justify-center',
                    );
                  }}
                />
              </div>
            </div>

            {/* Name */}
            <h1 className='font-poppins font-bold text-2xl text-[#0a0a0a] leading-tight mb-1.5'>
              {seller.name}
            </h1>

            {/* Rating row — single star + number + ( N reviews ) */}
            <div className='flex items-center gap-1.5 mb-4'>
              <Star
                size={16}
                className='text-yellow-400'
                fill='currentColor'
                aria-hidden='true'
              />
              <span className='font-inter text-sm text-[#0a0a0a] font-medium'>
                {seller.rating}
              </span>
              <Link
                to={ROUTES.SELLER_REVIEWS.replace(':id', id || 'ev-motors')}
                className='font-inter text-sm text-[#717182] hover:text-primary hover:underline underline-offset-2 transition-colors cursor-pointer'
              >
                ( {seller.reviewCount} reviews )
              </Link>
            </div>

            {/* Description paragraphs */}
            <div className='max-w-170 mb-5 flex flex-col gap-1.5'>
              {seller.description.map((para, i) => (
                <p
                  key={i}
                  className='font-inter text-sm text-[#4a4a5a] leading-[1.7]'
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Location — blue link style */}
            <div className='flex items-center gap-1.5'>
              <MapPin
                size={14}
                className='text-[#717182] shrink-0'
                aria-hidden='true'
              />
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(seller.address)}`}
                target='_blank'
                rel='noopener noreferrer'
                className='font-inter text-sm text-primary hover:underline'
              >
                {seller.address}
              </a>
            </div>
          </div>
        </section>

        {/* ── Listings: Sidebar + Grid ─────────────────────────────── */}
        <div ref={listingsRef} className='bg-[#f7f8fa] pt-8 pb-16'>
          <div className='container mx-auto px-4'>
            <div className='flex items-start gap-8'>
              {/* Filter Sidebar */}
              {/* <div className='hidden lg:block'>
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </div> */}

              {/* Car Grid */}
              <div className='flex-1 min-w-0'>
                {/* Sort bar */}
                <div className='flex items-center justify-between mb-5'>
                  <p className='font-inter text-sm text-gray-500'>
                    Showing{' '}
                    <span className='font-semibold text-ink'>
                      {ALL_CARS.length}
                    </span>{' '}
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

                {/* 5-column car grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5'>
                  {ALL_CARS.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={TOTAL_PAGES}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
};

export default memo(SellerProfileContent);
