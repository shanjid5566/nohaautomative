import React, { memo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  MapPin,
  MessageCircle,
  ChevronUp,
  ChevronDown,
  Star,
  User,
  BadgeCheck,
  ExternalLink,
} from 'lucide-react';
import { ROUTES } from '../../config';
import { ALL_CARS } from '../../data/cars';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import CtaSection from '../shared/CtaSection';

// ─── Figma image assets (valid 7 days) ───────────────────────────────────────
const CAR_IMAGES = [
  'https://www.figma.com/api/mcp/asset/047a2a8f-d56e-46c3-868c-4be9bfc665ef',
  'https://www.figma.com/api/mcp/asset/1307fcce-a07d-45a6-b37e-d85f6c523ff3',
  'https://www.figma.com/api/mcp/asset/5ad3a911-597c-4636-acc1-d5c8132acb31',
  'https://www.figma.com/api/mcp/asset/ae527cd2-cf8c-4f3b-9042-c9ad9d41df85',
];

// ─── Static reviews ───────────────────────────────────────────────────────────
const REVIEWS = [
  {
    id: 1,
    name: 'Michael Chan',
    rating: 5,
    date: '10/5/2025',
    text: 'The car was exactly as described. He answered all my questions and made the whole process smooth and transparent.',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    rating: 5,
    date: '10/5/2025',
    text: 'I contacted the seller through chat and got instant replies. Everything was clear, and there were no hidden issues.',
  },
  {
    id: 3,
    name: 'James Patel',
    rating: 4,
    date: '9/5/2025',
    text: "Very friendly and helpful. He even guided me through the paperwork process. I'm really satisfied with my purchase.",
  },
  {
    id: 4,
    name: 'Emma Davis',
    rating: 5,
    date: '9/5/2025',
    text: 'The car condition was exactly like the photos and description. Which definitely says a lot from the seller.',
  },
  {
    id: 5,
    name: 'Oliver Brown',
    rating: 4,
    date: '8/5/2025',
    text: 'From the contact to final deal, everything went perfectly. The seller was cooperative and honest.',
  },
  {
    id: 6,
    name: 'Chloe Martin',
    rating: 5,
    date: '8/5/2025',
    text: 'From the contact to final deal, everything went perfectly. The seller was cooperative and honest.',
  },
];

const RATING_BARS = [
  { star: 5, pct: 97 },
  { star: 4, pct: 82 },
  { star: 3, pct: 63 },
  { star: 2, pct: 24 },
  { star: 1, pct: 10 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const StarRow = memo(({ rating, size = 16 }) => (
  <div className='flex items-center gap-0.5'>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        size={size}
        className={n <= rating ? 'text-yellow-400' : 'text-gray-300'}
        fill={n <= rating ? 'currentColor' : 'none'}
        aria-hidden='true'
      />
    ))}
  </div>
));
StarRow.displayName = 'StarRow';

const StatPill = memo(({ icon: Icon, label, value }) => (
  <div className='flex items-center gap-3 bg-[rgba(237,233,255,0.5)] rounded-xl px-3 h-16 min-w-35 flex-1'>
    <div className='shrink-0 w-5 h-5 text-primary'>
      <Icon size={20} aria-hidden='true' />
    </div>
    <div className='flex flex-col'>
      <span className='text-[#717182] text-xs font-inter leading-4'>
        {label}
      </span>
      <span className='text-[#0a0a0a] text-base font-semibold font-inter leading-6 whitespace-nowrap'>
        {value}
      </span>
    </div>
  </div>
));
StatPill.displayName = 'StatPill';

const SpecRow = memo(({ label, value }) => (
  <div className='flex items-start justify-between border-b border-gray-100 py-2 gap-4'>
    <span className='text-[#313131] text-base font-inter shrink-0'>
      {label}
    </span>
    <span className='text-[#0a0a0a] text-base font-medium font-inter text-right'>
      {value}
    </span>
  </div>
));
SpecRow.displayName = 'SpecRow';

const ReviewCard = memo(({ review }) => (
  <div className='flex items-start justify-between border-b border-gray-100 pb-4 last:border-0'>
    <div className='flex flex-col gap-2 flex-1 mr-8'>
      <p className='font-inter font-normal text-xl text-black leading-8'>
        {review.name}
      </p>
      <StarRow rating={review.rating} size={16} />
      <p className='font-inter text-sm text-[#272727] leading-5.5'>
        {review.text}
      </p>
    </div>
    <p className='font-inter text-base text-[#4e4e4e] leading-6 whitespace-nowrap shrink-0'>
      {review.date}
    </p>
  </div>
));
ReviewCard.displayName = 'ReviewCard';

// ─── Main component ───────────────────────────────────────────────────────────

const CarDetailContent = () => {
  const { id } = useParams();
  const car = ALL_CARS.find((c) => String(c.id) === String(id)) || ALL_CARS[0];

  const [activeImg, setActiveImg] = useState(3); // start with main (index 3)
  const [reviewRating, setReviewRating] = useState(4);
  const [reviewText, setReviewText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const prevImg = () =>
    setActiveImg((p) => (p === 0 ? CAR_IMAGES.length - 1 : p - 1));
  const nextImg = () =>
    setActiveImg((p) => (p === CAR_IMAGES.length - 1 ? 0 : p + 1));

  const SPECS = [
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

  // Split specs into 3 columns for desktop
  const col0 = SPECS.filter((_, i) => i % 3 === 0);
  const col1 = SPECS.filter((_, i) => i % 3 === 1);
  const col2 = SPECS.filter((_, i) => i % 3 === 2);

  return (
    <div className='min-h-screen bg-white font-inter'>
      <Navbar />

      <main className='container mx-auto px-4 pt-8 pb-16'>
        {/* ── Section 1: Image Gallery + Seller Card ─────────────── */}
        <div className='flex flex-col lg:flex-row gap-4 mb-5'>
          {/* Left group: thumbnail strip + main image always side-by-side */}
          <div className='flex gap-2 sm:gap-3 flex-1 min-w-0'>
            {/* Vertical thumbnail strip — same height as main image */}
            <div className='flex flex-col gap-1.5 sm:gap-2 w-14 sm:w-18 lg:w-37.5 shrink-0 h-64 sm:h-80 lg:h-150'>
              {/* UP arrow */}
              <button
                type='button'
                onClick={prevImg}
                aria-label='Previous image'
                className='w-full shrink-0 flex items-center justify-center py-1.5 rounded bg-primary hover:bg-primary-dark text-white transition-colors'
              >
                <ChevronUp size={16} aria-hidden='true' />
              </button>

              {/* Thumbnails — flex-1 fills remaining height equally */}
              {CAR_IMAGES.map((src, i) => (
                <button
                  key={i}
                  type='button'
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`flex-1 min-h-0 w-full rounded overflow-hidden border-2 transition-colors ${
                    activeImg === i ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={src}
                    alt={`${car.title} view ${i + 1}`}
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.add('bg-gray-200');
                    }}
                  />
                </button>
              ))}

              {/* DOWN arrow */}
              <button
                type='button'
                onClick={nextImg}
                aria-label='Next image'
                className='w-full shrink-0 flex items-center justify-center py-1.5 rounded bg-primary hover:bg-primary-dark text-white transition-colors'
              >
                <ChevronDown size={16} aria-hidden='true' />
              </button>
            </div>

            {/* Main image — fixed height, same size for every image */}
            <div className='flex-1 h-64 sm:h-80 lg:h-150 rounded overflow-hidden bg-gray-200'>
              <img
                src={CAR_IMAGES[activeImg]}
                alt={car.title}
                className='w-full h-full object-cover'
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add(
                    'bg-gradient-to-br',
                    'from-slate-300',
                    'to-slate-400',
                  );
                }}
              />
            </div>
          </div>

          {/* Seller information card */}
          <div className='lg:w-85 shrink-0'>
            <div className='bg-[#f9fafb] border border-gray-100 rounded-2xl p-6 flex flex-col gap-5'>
              <p className='font-inter font-medium text-base text-[#0a0a0a]'>
                Seller Information
              </p>

              {/* Seller details */}
              <div className='flex items-start gap-3'>
                <div className='w-12 h-12 rounded-full bg-[rgba(108,59,255,0.1)] flex items-center justify-center shrink-0'>
                  <User size={24} className='text-primary' aria-hidden='true' />
                </div>
                <div className='flex flex-col gap-0.5'>
                  <div className='flex items-center gap-2'>
                    <span className='font-inter font-semibold text-lg text-[#0a0a0a] leading-7'>
                      EV Motors
                    </span>
                    <BadgeCheck
                      size={16}
                      className='text-primary'
                      aria-hidden='true'
                    />
                  </div>
                  <span className='font-inter text-sm text-[#717182] leading-5'>
                    Member since June 2021
                  </span>
                  <span className='font-inter text-sm text-[#717182] leading-5'>
                    15 active listings
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className='flex items-center gap-2'>
                <MapPin
                  size={16}
                  className='text-[#717182]'
                  aria-hidden='true'
                />
                <span className='font-inter text-sm text-[#717182]'>
                  Manchester
                </span>
              </div>

              {/* CTA buttons */}
              <div className='flex flex-col gap-3 pt-2'>
                <Link
                  to={ROUTES.CHAT}
                  state={{ sellerId: 'ev-motors', sellerName: 'EV Motors' }}
                  className='w-full h-10 rounded-[10px] bg-primary hover:bg-primary-dark text-white font-inter font-medium text-sm flex items-center justify-center gap-2 transition-colors'
                >
                  <MessageCircle size={16} aria-hidden='true' />
                  Chat with Seller
                </Link>
                <Link
                  to={ROUTES.SELLER_PROFILE.replace(':id', 'ev-motors')}
                  className='w-full h-10 rounded-[10px] bg-primary-light hover:bg-[#e2d9ff] text-primary font-inter text-sm flex items-center justify-center gap-2 transition-colors'
                >
                  View Seller Profile
                  <ExternalLink size={16} aria-hidden='true' />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 2: Car Details Card ─────────────────────────── */}
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

          {/* Stat pills */}
          <div className='flex flex-wrap gap-3'>
            <StatPill icon={Calendar} label='Year' value={car.year} />
            <StatPill icon={Gauge} label='Mileage' value={car.mileage} />
            <StatPill icon={Fuel} label='Fuel' value={car.fuel} />
            <StatPill
              icon={Settings2}
              label='Transmission'
              value={car.transmission}
            />
          </div>
        </div>

        {/* ── Section 3: Specifications ──────────────────────────── */}
        <div className='bg-[#f9fafb] rounded-2xl px-6 pt-6 pb-4 mb-5'>
          <h2 className='font-inter font-medium text-[32px] text-[#0a0a0a] mb-6'>
            Specifications
          </h2>

          {/* 3-col on desktop, 1-col on mobile */}
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

        {/* ── Section 4: Feedback Overview ──────────────────────── */}
        <div className='mb-5 flex flex-col gap-8'>
          <h2 className='font-inter font-medium text-2xl text-black'>
            Feedback
          </h2>

          {/* Rating summary */}
          <div className='flex flex-col sm:flex-row items-start gap-8'>
            {/* Big number */}
            <div className='flex flex-col gap-1 shrink-0'>
              <div className='flex items-end gap-1'>
                <span
                  className='font-inter font-medium text-[#1c1c1c] leading-none'
                  style={{ fontSize: '72px' }}
                >
                  4.5
                </span>
                <span className='font-inter text-[#424242] text-2xl leading-10'>
                  /5
                </span>
              </div>
              <span className='font-inter text-[#080f1a] text-base'>
                ( 50 new reviews )
              </span>
            </div>

            {/* Rating bars */}
            <div className='flex flex-col gap-3 flex-1 min-w-0 max-w-70'>
              {RATING_BARS.map(({ star, pct }) => (
                <div key={star} className='flex items-center gap-3'>
                  <div className='flex items-center gap-1 w-6 shrink-0'>
                    <Star
                      size={14}
                      className='text-yellow-400'
                      fill='currentColor'
                      aria-hidden='true'
                    />
                    <span className='font-inter text-sm text-black'>
                      {star}
                    </span>
                  </div>
                  <div className='relative flex-1 h-1 bg-[#d9d9d9] rounded-full overflow-hidden'>
                    <div
                      className='absolute left-0 top-0 h-full bg-[#2a2a2a] rounded-full'
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Feedback list */}
          <div className='bg-white border border-gray-100 rounded-xl overflow-hidden'>
            <div className='px-6 py-5 border-b border-gray-100'>
              <p className='font-poppins text-2xl text-black font-medium'>
                Customer Feedback
              </p>
            </div>
            <div className='px-6 py-4 flex flex-col gap-5'>
              {REVIEWS.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Section 5: Leave a Review ──────────────────────────── */}
        <div className='rounded-xl border border-gray-100 p-6 mb-5 flex flex-col gap-4 bg-white'>
          <div className='flex flex-col gap-2'>
            <p className='font-inter font-medium text-base text-[#0a0a0a]'>
              Seller Rating
            </p>
            {/* Interactive star rating */}
            <div className='flex items-center gap-1'>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type='button'
                  aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
                  onClick={() => setReviewRating(n)}
                  onMouseEnter={() => setHoverRating(n)}
                  onMouseLeave={() => setHoverRating(0)}
                  className='transition-transform hover:scale-110'
                >
                  <Star
                    size={24}
                    className={
                      n <= (hoverRating || reviewRating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }
                    fill={
                      n <= (hoverRating || reviewRating)
                        ? 'currentColor'
                        : 'none'
                    }
                    aria-hidden='true'
                  />
                </button>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label
              htmlFor='review-text'
              className='font-inter font-medium text-sm text-[#0a0a0a]'
            >
              Review
            </label>
            <textarea
              id='review-text'
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder='Share your experience with this seller...'
              className='w-full rounded-lg border border-gray-100 px-4 py-3 font-inter text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none'
            />
          </div>

          <button
            type='button'
            className='w-full h-11 bg-primary hover:bg-primary-dark text-white font-inter font-medium text-base rounded-lg transition-colors'
          >
            Submit
          </button>
        </div>
      </main>

      <CtaSection />

      <Footer />
    </div>
  );
};

export default memo(CarDetailContent);
