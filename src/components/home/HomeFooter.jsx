import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { ROUTES } from '../../config';
import { LogoIcon } from '../shared/Navbar';

const SOCIAL_LINKS = [
  { label: 'Facebook', icon: <Facebook size={18} aria-hidden='true' /> },
  { label: 'Twitter', icon: <Twitter size={18} aria-hidden='true' /> },
  { label: 'Instagram', icon: <Instagram size={18} aria-hidden='true' /> },
  { label: 'LinkedIn', icon: <Linkedin size={18} aria-hidden='true' /> },
];

const ACCOUNT_LINKS = [
  { label: 'Sign In', to: ROUTES.LOGIN },
  { label: 'Sign Up', to: ROUTES.SIGN_UP },
  { label: 'My Profile', to: ROUTES.USER_PROFILE },
  { label: 'My Orders', to: ROUTES.USER_ORDERS },
];

// ─── HomeFooter ───────────────────────────────────────────────────────────────

const HomeFooter = memo(() => (
  <footer className='bg-[#f5f5f7]'>
    <div className='max-w-300 mx-auto px-4 pt-15 pb-20'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8 items-start'>
        {/* Col 1 — Brand */}
        <div>
          <Link
            to={ROUTES.HOME}
            className='flex items-center gap-2 mb-5'
            aria-label='Noah Automotive — Go to homepage'
          >
            <LogoIcon />
            <span className='font-bold text-lg text-ink font-inter leading-none'>
              Logoipsum
            </span>
          </Link>
          {/* Invisible spacer matches h3 line-height so description aligns with col 2/3 content */}
          <div className='h-px mb-5' aria-hidden='true' />
          <p className='font-inter text-sm text-gray-600 leading-[1.65]'>
            The UK&apos;s premier destination for buying and selling high
            quality vehicles. Experience the future of car marketplaces.
          </p>
        </div>

        {/* Col 2 — Account */}
        <nav aria-label='Account links'>
          <h3 className='font-poppins font-semibold text-ink text-base mb-5'>
            Account
          </h3>
          <ul className='flex flex-col gap-3'>
            {ACCOUNT_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className='font-inter text-sm text-gray-600 hover:text-primary transition-colors'
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Col 3 — Follow Us */}
        <div>
          <h3 className='font-poppins font-semibold text-ink text-base mb-5'>
            Follow Us
          </h3>
          <div className='flex items-center gap-3'>
            {SOCIAL_LINKS.map(({ label, icon }) => (
              <button
                key={label}
                type='button'
                aria-label={`Follow us on ${label}`}
                className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center
                  text-gray-600 hover:bg-primary hover:text-white transition-colors duration-200'
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Copyright bar */}
    <div className='border-t border-gray-200'>
      <div className='max-w-300 mx-auto px-4 py-4'>
        <p className='font-inter text-sm text-gray-500'>
          © 2026 d4r.co.uk. All rights reserved. Built with passion for car
          enthusiasts.
        </p>
      </div>
    </div>
  </footer>
));
HomeFooter.displayName = 'HomeFooter';

export default HomeFooter;
