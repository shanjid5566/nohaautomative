import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { LogoIcon } from './Navbar';
import { ROUTES } from '../../config';

const ACCOUNT_LINKS = [
  'My Profile',
  'Message',
  'Sign In',
];

const CARLIST_LINKS = [
  'Car List',
  'Browse by Type',
  'Featured Cars',
];

const SOCIAL_LINKS = [
  { label: 'Facebook', icon: <Facebook size={18} aria-hidden='true' /> },
  { label: 'Twitter', icon: <Twitter size={18} aria-hidden='true' /> },
  { label: 'Instagram', icon: <Instagram size={18} aria-hidden='true' /> },
  { label: 'LinkedIn', icon: <Linkedin size={18} aria-hidden='true' /> },
];

const Footer = memo(() => (
  <footer className='bg-[#f5f5f7]'>
    <div className='container mx-auto px-4 pt-15 pb-20'>
      <div className='flex flex-col md:flex-row gap-10 md:gap-8 lg:gap-10 items-start justify-between'>
        {/* Brand column */}
        <div className='md:flex-1'>
          <Link to={ROUTES.HOME} className='flex items-center gap-2 mb-5'>
            <LogoIcon />
            <span className='font-bold text-lg text-ink font-inter leading-none'>
              Logoipsum
            </span>
          </Link>
          <p className='font-inter max-w-sm text-sm text-gray-600 leading-[1.65]'>
            The UK&apos;s premier destination for buying and selling high
            quality vehicles. Experience the future of car marketplaces.
          </p>
        </div>

        {/* Account column - 2 columns */}
        <div className='md:flex-1 '>
          <h3 className='font-poppins font-semibold text-ink text-base mb-10'>
            Account
          </h3>
          <div className='grid grid-cols-2 gap-6'>
            <ul className='flex flex-col gap-3'>
              {ACCOUNT_LINKS.map((item) => (
                <li key={item}>
                  <a
                    href='#'
                    className='font-inter text-sm text-gray-600 hover:text-primary transition-colors'
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <ul className='flex flex-col gap-3'>
              {CARLIST_LINKS.map((item) => (
                <li key={item}>
                  <a
                    href='#'
                    className='font-inter text-sm text-gray-600 hover:text-primary transition-colors'
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Follow column */}
        <div className='md:w-auto md:ml-auto'>
          <h3 className='font-poppins font-semibold text-ink text-base mb-10'>
            Follow Us
          </h3>
          <div className='flex items-center gap-3'>
            {SOCIAL_LINKS.map(({ label, icon }) => (
              <button
                key={label}
                type='button'
                aria-label={label}
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
      <div className='container mx-auto px-4 py-4'>
        <p className='font-inter text-sm text-gray-500'>
          © 2026 d4r.co.uk. All rights reserved. Built with passion for car
          enthusiasts.
        </p>
      </div>
    </div>
  </footer>
));
Footer.displayName = 'Footer';

export default Footer;
