import React, { memo, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { User, MessageCircle, Menu, X } from 'lucide-react';
import { ROUTES } from '../../config';
import { selectUser } from '../../store/slices/authSlice';

const AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.SIGN_UP,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.OTP_VERIFICATION,
  ROUTES.RESET_PASSWORD,
];

const NAV_LINKS = [{ label: 'Car List', to: ROUTES.CAR_LIST }];

export const LogoIcon = () => (
  <svg
    width='36'
    height='36'
    viewBox='0 0 36 36'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
  >
    <rect width='36' height='36' rx='7' fill='var(--color-primary)' />
    <path d='M18 7L27 13.5V28H9V13.5L18 7Z' fill='white' fillOpacity='0.15' />
    <path d='M18 9L25 14.5V26H11V14.5L18 9Z' fill='white' />
    <rect x='15' y='19' width='6' height='7' fill='var(--color-primary)' />
  </svg>
);

const Navbar = memo(() => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuthPage = AUTH_ROUTES.includes(pathname);
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = !!user;
  const userRole = user?.role?.toLowerCase();
  const isAdmin = userRole === 'admin';
  const isUser = userRole === 'user';
  const isSeller = userRole === 'seller';

  const toggle = useCallback(() => setIsOpen((o) => !o), []);
  const close = useCallback(() => setIsOpen(false), []);

  const handleProfileClick = useCallback(() => {
    console.log('Profile clicked:', { user, isAdmin, isUser, isSeller, userRole });
    if (isAdmin) {
      console.log('Navigating to admin dashboard:', ROUTES.ADMIN_DASHBOARD);
      navigate(ROUTES.ADMIN_DASHBOARD);
    } else if (isUser) {
      console.log('Navigating to user profile:', ROUTES.USER_PROFILE);
      navigate(ROUTES.USER_PROFILE);
    } else if (isSeller) {
      console.log('Navigating to seller dashboard:', ROUTES.SELLER_DASHBOARD);
      navigate(ROUTES.SELLER_DASHBOARD);
    } else {
      console.log('User role not recognized');
    }
  }, [isAdmin, isUser, isSeller, navigate, user, userRole]);

  const handleMessageClick = useCallback(() => {
    console.log('Message clicked:', { user, isUser, isSeller, userRole });
    if (isUser) {
      console.log('Navigating to user message:', ROUTES.USER_MESSAGE);
      navigate(ROUTES.USER_MESSAGE);
    } else if (isSeller) {
      console.log('Navigating to seller message:', ROUTES.SELLER_MESSAGE);
      navigate(ROUTES.SELLER_MESSAGE);
    } else {
      console.log('User is not a regular user or seller');
    }
  }, [isUser, isSeller, navigate, user, userRole]);

  /* Close menu on route change */
  useEffect(() => {
    close();
  }, [pathname, close]);

  /* Lock body scroll while drawer is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* ── Backdrop overlay — z-40, behind header (z-50) ─────────────────
           Lives at document.body via portal so it truly sits below z-50     */}
      {createPortal(
        <div
          aria-hidden='true'
          onClick={close}
          className={[
            'fixed inset-0 z-40 bg-ink/40',
            'transition-opacity duration-300 ease-in-out',
            isOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none',
          ].join(' ')}
        />,
        document.body,
      )}

      {/* ── Fixed header — z-50 ──────────────────────────────────────────── */}
      <header className='fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
        {/* ── Main bar ─────────────────────────────────────────────────── */}
        <div className='container mx-auto px-4 h-16 md:h-18 lg:h-22 flex items-center justify-between'>
          {/* Left group — logo + nav */}
          <div className='flex items-center gap-8'>
            <Link
              to={ROUTES.HOME}
              onClick={close}
              className='flex items-center gap-2 shrink-0'
            >
              <LogoIcon />
              <span className='font-bold text-lg text-ink font-inter leading-none'>
                Logoipsum
              </span>
            </Link>

            {/* ── Desktop nav (md+) ─────────────────────────────────────────── */}
            <nav
              className='hidden md:flex items-center gap-6'
              aria-label='Main'
            >
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className='relative text-sm font-medium text-ink font-inter
                  after:absolute after:-bottom-0.5 after:left-0 after:h-0.5
                  after:w-0 after:bg-primary after:rounded-full
                  after:transition-[width] after:duration-300
                  hover:text-primary hover:after:w-full transition-colors'
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Desktop actions (md+) ─────────────────────────────────────── */}
          <div className='hidden md:flex items-center gap-2'>
            {/* Show icons only if logged in */}
            {isLoggedIn && (
              <button
                type='button'
                aria-label='My profile'
                onClick={handleProfileClick}
                className='w-10 h-10 flex items-center justify-center rounded-full
                  hover:bg-primary-light text-ink hover:text-primary transition-colors duration-200 cursor-pointer'
              >
                <User size={20} aria-hidden='true' />
              </button>
            )}

            {/* Show message icon only if logged in and not admin */}
            {isLoggedIn && !isAdmin && (
              <button
                type='button'
                aria-label='Messages'
                onClick={handleMessageClick}
                className='w-10 h-10 flex items-center justify-center rounded-full
                  hover:bg-primary-light text-ink hover:text-primary transition-colors duration-200 cursor-pointer'
              >
                <MessageCircle size={20} aria-hidden='true' />
              </button>
            )}

            {/* Show auth buttons only if not logged in and not on auth page */}
            {!isLoggedIn && !isAuthPage && (
              <Link
                to={ROUTES.LOGIN}
                className='text-sm font-semibold text-primary border border-primary
                  px-5 py-2.25 rounded-full whitespace-nowrap ml-1
                  hover:bg-primary hover:text-white cursor-pointer
                  transition-colors duration-200'
              >
                Sign In
              </Link>
            )}

            {!isLoggedIn && (
              <Link
                to={ROUTES.SIGN_UP}
                className='bg-primary text-white text-sm font-semibold font-public-sans
                  px-5 py-2.5 rounded-full whitespace-nowrap ml-1
                  hover:bg-primary-dark active:scale-95 cursor-pointer
                  transition-[background-color,transform] duration-200'
              >
                Become a Seller/User
              </Link>
            )}
          </div>

          {/* ── Mobile right group (< md) ─────────────────────────────────── */}
          <div className='flex md:hidden items-center gap-1'>
            {/* Show icons only if logged in */}
            {isLoggedIn && (
              <button
                type='button'
                aria-label='My profile'
                onClick={handleProfileClick}
                className='w-10 h-10 flex items-center justify-center rounded-full
                  hover:bg-primary-light text-ink hover:text-primary transition-colors duration-200 cursor-pointer'
              >
                <User size={20} aria-hidden='true' />
              </button>
            )}

            {/* Show message icon only if logged in and not admin */}
            {isLoggedIn && !isAdmin && (
              <button
                type='button'
                aria-label='Messages'
                onClick={handleMessageClick}
                className='w-10 h-10 flex items-center justify-center rounded-full
                  hover:bg-primary-light text-ink hover:text-primary transition-colors duration-200 cursor-pointer'
              >
                <MessageCircle size={20} aria-hidden='true' />
              </button>
            )}

            {/* Hamburger — icon morphs with rotation */}
            <button
              type='button'
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls='mobile-menu'
              onClick={toggle}
              className='w-10 h-10 flex items-center justify-center rounded-full
                hover:bg-gray-100 text-ink transition-colors duration-200'
            >
              <span
                className={[
                  'transition-transform duration-300 ease-in-out block',
                  isOpen ? 'rotate-90' : 'rotate-0',
                ].join(' ')}
              >
                {isOpen ? (
                  <X size={20} aria-hidden='true' />
                ) : (
                  <Menu size={20} aria-hidden='true' />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* ── Mobile drawer — absolute below header, overlays hero (no layout shift) ─
             top-full anchors to the header's bottom edge; hero never moves            */}
        <nav
          id='mobile-menu'
          aria-label='Mobile menu'
          aria-hidden={!isOpen}
          className={[
            'absolute top-full left-0 right-0 md:hidden overflow-hidden',
            'bg-white border-t border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.10)]',
            'transition-[max-height,opacity] duration-500 ease-in-out',
            isOpen
              ? 'max-h-150 opacity-100'
              : 'max-h-0 opacity-0 pointer-events-none',
          ].join(' ')}
        >
          <div className='px-4 pb-6 pt-4 flex flex-col gap-1'>
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={close}
                className='text-base font-medium text-ink hover:text-primary
                  transition-colors duration-200 font-inter
                  py-3 border-b border-gray-100 last:border-b-0'
              >
                {label}
              </Link>
            ))}

            {/* Show auth buttons only if not logged in */}
            {!isLoggedIn && (
              <div className='flex flex-col gap-3 pt-4'>
                {!isAuthPage && (
                  <Link
                    to={ROUTES.LOGIN}
                    onClick={close}
                    className='text-base font-semibold text-primary border border-primary
                      px-5 py-3 rounded-full text-center cursor-pointer
                      hover:bg-primary hover:text-white
                      transition-colors duration-200'
                  >
                    Sign In
                  </Link>
                )}

                <Link
                  to={ROUTES.SIGN_UP}
                  onClick={close}
                  className='bg-primary text-white text-base font-semibold font-public-sans
                    px-5 py-3 rounded-full text-center cursor-pointer
                    hover:bg-primary-dark active:scale-[0.98]
                    transition-[background-color,transform] duration-200'
                >
                  Become a Seller/User
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
      {/* Spacer — occupies the height the fixed header no longer holds in flow */}
      <div className='h-16 md:h-18 lg:h-22' aria-hidden='true' />
    </>
  );
});
Navbar.displayName = 'Navbar';

export default Navbar;
