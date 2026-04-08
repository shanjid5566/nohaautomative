export const APP_CONFIG = {
  NAME: process.env.REACT_APP_NAME || 'My React App',
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
};

export const ROUTES = {
  HOME: '/',
  CAR_LIST: '/cars',
  CAR_DETAIL: '/cars/:id',
  SELLER_PROFILE: '/seller/:id',
  SELLER_REVIEWS: '/seller/:id/reviews',
  CHAT: '/chat',
  ABOUT: '/about',
  SERVICES: '/services',
  CONTACT: '/contact',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  OTP_VERIFICATION: '/otp-verification',
  RESET_PASSWORD: '/reset-password',
  SIGN_UP: '/sign-up',
  PROFILE: '/user/profile',
  ADMIN: '/admin',
  REDUX_DEMO: '/redux-demo',
  // Admin sub-routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USER_INFORMATION: '/admin/user-information',
  ADMIN_VENDOR: '/admin/vendor',
  ADMIN_LEADS: '/admin/leads',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_MARKETPLACE_ORDERS: '/admin/marketplace-orders',
  ADMIN_CASE_STUDIES: '/admin/case-studies',
  ADMIN_BLOG: '/admin/blog',
  ADMIN_JOBS: '/admin/jobs',
  ADMIN_PRICING: '/admin/pricing',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_CAR_DETAIL: '/admin/cars/:id',
  // Seller dashboard
  SELLER: '/seller',
  SELLER_DASHBOARD: '/seller/dashboard',
  SELLER_LISTINGS: '/seller/listings',
  SELLER_MESSAGE: '/seller/message',
  SELLER_SETTINGS: '/seller/settings',
  SELLER_ORDERS: '/seller/orders',
  SELLER_ANALYTICS: '/seller/analytics',
  // User dashboard
  USER: '/user',
  USER_PROFILE: '/user/profile',
  USER_ORDERS: '/user/orders',
  USER_SAVED: '/user/saved',
  USER_MESSAGE: '/user/message',
};

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || '',
  VITALS_ENDPOINT: process.env.REACT_APP_VITALS_ENDPOINT || '',
  TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000', 10),
  RETRY_ATTEMPTS: parseInt(process.env.REACT_APP_API_RETRY_ATTEMPTS || '3', 10),
  RETRY_DELAY: parseInt(process.env.REACT_APP_API_RETRY_DELAY || '1000', 10),
};

export const SEO_CONFIG = {
  DEFAULT_TITLE: process.env.REACT_APP_SEO_TITLE || 'Noahautomotive',
  DEFAULT_DESCRIPTION:
    process.env.REACT_APP_SEO_DESCRIPTION || 'A professional React application',
  DEFAULT_KEYWORDS: (
    process.env.REACT_APP_SEO_KEYWORDS || 'react,webpack,tailwind'
  ).split(','),
  SITE_URL: typeof window !== 'undefined' ? window.location.origin : '',
};

export const PERFORMANCE_BUDGETS = {
  LCP: 2500,
  FCP: 1800,
  CLS: 0.1,
  INP: 200,
  TTFB: 800,
};

export const TOAST_CONFIG = {
  POSITION: 'top-center',
  DURATION: 3000,
};
