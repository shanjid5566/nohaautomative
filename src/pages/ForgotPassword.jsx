import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '../config';

const HERO_IMG =
  'https://www.figma.com/api/mcp/asset/e73a3866-6de2-4d8a-9b29-7cc686e37cd3';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 600));
      navigate(ROUTES.OTP_VERIFICATION, { state: { email } });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-dvh flex'>
      {/* ── Left: hero photo ── */}
      <div className='hidden lg:block lg:w-1/2 relative overflow-hidden shrink-0'>
        <img
          src={HERO_IMG}
          alt='Sports car speeding at night'
          className='absolute inset-0 w-full h-full object-cover pointer-events-none'
        />
      </div>

      {/* ── Right: white panel ── */}
      <div className='flex-1 bg-white flex items-center justify-center shadow-[-7px_0px_11.4px_0px_rgba(0,0,0,0.25)] overflow-y-auto'>
        <div className='w-full max-w-106 px-8 py-12 flex flex-col gap-6'>
          {/* Heading */}
          <div className='flex flex-col gap-3'>
            <h1 className='font-public-sans font-semibold text-xl text-ink leading-7'>
              Forgot Password
            </h1>
            <p className='font-public-sans font-normal text-sm text-secondary leading-5'>
              Enter your email address linked to your account.
            </p>
          </div>

          {/* Form */}
          {sent ? (
            <div className='flex flex-col gap-3'>
              <p className='font-normal text-sm text-secondary leading-5'>
                Check your inbox — a reset code has been sent to{' '}
                <strong className='text-ink'>{email}</strong>.
              </p>
              <Link
                to={ROUTES.LOGIN}
                className='font-medium text-sm text-primary hover:text-primary-dark transition-colors'
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className='flex flex-col gap-6'
            >
              {/* Email field */}
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='fp-email'
                  className='font-normal text-sm text-[#191c1f] leading-5'
                >
                  Email Address
                </label>
                <input
                  type='email'
                  id='fp-email'
                  autoComplete='email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder='Enter your email address...'
                  aria-invalid={!!error}
                  aria-describedby={error ? 'fp-email-error' : undefined}
                  className='bg-primary-light border border-[#e4e7e9] h-11 rounded-xs px-3 w-full font-normal text-sm text-[#191c1f] placeholder:text-subtle outline-none focus:ring-2 focus:ring-primary/30'
                />
                {error && (
                  <p id='fp-email-error' className='text-xs text-red-600'>
                    {error}
                  </p>
                )}
              </div>

              {/* Send Code button */}
              <button
                type='submit'
                disabled={isLoading}
                className='bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white h-12 rounded-xs w-full font-bold text-sm tracking-[0.168px] uppercase flex items-center justify-center gap-2 transition-colors'
              >
                {isLoading ? (
                  <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                ) : (
                  <>
                    Send Code
                    <ArrowRight size={20} aria-hidden='true' />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Links */}
          <div className='flex flex-col gap-2'>
            <p className='font-normal text-sm leading-5'>
              <span className='text-secondary'>Already have an account? </span>
              <Link
                to={ROUTES.LOGIN}
                className='font-medium text-primary hover:text-primary-dark transition-colors'
              >
                Sign In
              </Link>
            </p>
            <p className='font-normal text-sm leading-5'>
              <span className='text-secondary'>New to Noahautomotive? </span>
              <Link
                to={ROUTES.SIGN_UP}
                className='font-medium text-primary hover:text-primary-dark transition-colors'
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* Divider */}
          <hr className='border-t border-[#e4e7e9] w-full' />

          {/* Support line */}
          <p className='font-normal text-sm text-ink leading-5'>
            Need help?{' '}
            <strong className='font-bold'>Contact Customer Support</strong>
            {" and we'll assist you."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
