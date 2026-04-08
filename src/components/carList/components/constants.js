export const MAKE_OPTIONS = ['BMW', 'Tesla', 'Toyota', 'Ford', 'Audi', 'Range Rover'];

export const MODEL_OPTIONS = [
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

export const HERO_YEAR_OPTIONS = ['2024', '2023', '2022', '2021', '2020'];

export const PRICE_RANGE_OPTS = ['Under $20k', '$20k-$40k', '$40k-$60k', 'Over $60k'];

export const PRICE_RANGES = [
  { label: 'All Price', value: '' },
  { label: 'Under $10,000', value: 'under-10000' },
  { label: '$10,000 to $20,000', value: '10000-20000' },
  { label: '$20,000 to $40,000', value: '20000-40000' },
  { label: '$40,000 to $60,000', value: '40000-60000' },
  { label: 'Above $60,000', value: 'above-60000' },
];

export const SEAT_OPTIONS = ['2 seat', '4 seat', '5 seat', '6 seat', 'Above 6'];
export const FUEL_OPTIONS = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'LPG'];
export const TRANSMISSION_OPTIONS = ['Manual', 'Automatic', 'Semi-Automatic'];
export const CONDITION_OPTIONS = ['New', 'Used'];

export const YEAR_CHECKBOXES = [
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  'Under 2020',
];

export const INITIAL_FILTERS = {
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

export const CARS_PER_PAGE = 15;
export const TOTAL_PAGES = 10;
