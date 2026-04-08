import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { ROUTES } from '../config';

const HERO_IMG =
  'https://www.figma.com/api/mcp/asset/15e8564a-10c2-45bb-a2ba-5f7cc64a78c7';

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError('');

      if (!form.fullName.trim()) {
        setError('Full name is required.');
        return;
      }
      if (!form.email.trim()) {
        setError('Email is required.');
        return;
      }
      if (form.password.length < 8) {
        setError('Password must be at least 8 characters.');
        return;
      }

      setIsLoading(true);
      try {
        /* TODO: call sign-up API */
        await new Promise((res) => setTimeout(res, 600));
        navigate(ROUTES.LOGIN, { replace: true });
      } finally {
        setIsLoading(false);
      }
    },
    [form, navigate],
  );

  return (
    <div className='min-h-dvh flex'>
      {/* ── Left: hero photo ── */}
      <div className='hidden lg:block lg:w-1/2 relative overflow-hidden shrink-0'>
        <img
          src={HERO_IMG}
          alt='Silver sports car on a winding road'
          className='absolute inset-0 w-full h-full object-cover pointer-events-none'
        />
      </div>

      {/* ── Right: white panel ── */}
      <div className='flex-1 bg-white shadow-[-7px_0px_11.4px_0px_rgba(0,0,0,0.25)] overflow-y-auto'>
        <div className='w-full max-w-153.5 mx-auto pt-24.25 pb-12 px-4 flex flex-col gap-6'>
          {/* Back to Home */}
          <Link
            to={ROUTES.HOME}
            className='self-start flex items-center gap-1.5 font-inter text-sm text-secondary hover:text-primary transition-colors'
          >
            <span aria-hidden='true'>←</span> Back to Home
          </Link>
          {/* Heading */}
          <div className='flex flex-col gap-3'>
            <h1 className='font-poppins font-medium text-2xl text-ink leading-normal'>
              Personal Information
            </h1>
            <p className='font-inter font-normal text-xl text-secondary leading-7'>
              Provide your basic personal details to create your user profile.
            </p>
          </div>

          {/* Fields + Actions */}
          <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              {/* Full Name */}
              <div className='flex flex-col gap-2.5'>
                <label
                  htmlFor='su-fullName'
                  className='font-inter font-medium text-base text-secondary leading-5'
                >
                  Full Name
                </label>
                <input
                  id='su-fullName'
                  name='fullName'
                  type='text'
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder='Enter your full name'
                  autoComplete='name'
                  className='w-full h-15 bg-primary-light rounded-lg px-3.5 font-inter font-normal text-sm text-ink placeholder:text-subtle leading-5 outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
                />
              </div>

              {/* Email */}
              <div className='flex flex-col gap-2.5'>
                <label
                  htmlFor='su-email'
                  className='font-inter font-medium text-base text-secondary leading-5'
                >
                  Email
                </label>
                <input
                  id='su-email'
                  name='email'
                  type='email'
                  value={form.email}
                  onChange={handleChange}
                  placeholder='Enter your email..'
                  autoComplete='email'
                  className='w-full h-15 bg-primary-light rounded-lg px-3.5 font-inter font-normal text-sm text-ink placeholder:text-subtle leading-5 outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
                />
              </div>

              {/* Phone Number */}
              <div className='flex flex-col gap-2.5'>
                <label
                  htmlFor='su-phone'
                  className='font-inter font-medium text-base text-secondary leading-5'
                >
                  Phone Number
                </label>
                <input
                  id='su-phone'
                  name='phone'
                  type='tel'
                  value={form.phone}
                  onChange={handleChange}
                  placeholder='Enter your Phone number..'
                  autoComplete='tel'
                  className='w-full h-15 bg-primary-light rounded-lg px-3.5 font-inter font-normal text-sm text-ink placeholder:text-subtle leading-5 outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
                />
              </div>

              {/* Address */}
              <div className='flex flex-col gap-2.5'>
                <label
                  htmlFor='su-address'
                  className='font-inter font-medium text-base text-secondary leading-5'
                >
                  Address
                </label>
                <input
                  id='su-address'
                  name='address'
                  type='text'
                  value={form.address}
                  onChange={handleChange}
                  placeholder='enter your address'
                  autoComplete='street-address'
                  className='w-full h-15 bg-primary-light rounded-lg px-3.5 font-inter font-normal text-sm text-ink placeholder:text-subtle leading-5 outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
                />
              </div>

              {/* Password */}
              <div className='flex flex-col gap-2.5'>
                <label
                  htmlFor='su-password'
                  className='font-inter font-medium text-base text-secondary leading-5'
                >
                  Password
                </label>
                <div className='relative'>
                  <input
                    id='su-password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder='write password'
                    autoComplete='new-password'
                    className='w-full h-15 bg-primary-light rounded-lg px-3.5 pr-11 font-inter font-normal text-sm text-ink placeholder:text-subtle leading-5 outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    className='absolute right-3.5 top-1/2 -translate-y-1/2 text-subtle hover:text-secondary transition-colors'
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <p className='font-inter text-xs text-red-600 -mt-2'>{error}</p>
            )}

            {/* Actions */}
            <div className='flex flex-col gap-6 items-center'>
              {/* Sign Up button */}
              <button
                type='submit'
                disabled={isLoading}
                className='bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white h-12 w-full rounded-lg font-poppins font-medium text-base flex items-center justify-center transition-colors'
              >
                {isLoading ? (
                  <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                ) : (
                  'Sign UP'
                )}
              </button>

              {/* Log In link */}
              <p className='font-inter font-normal text-base text-ink text-center'>
                Already Have an account{' '}
                <Link
                  to={ROUTES.LOGIN}
                  className='font-inter font-semibold text-primary hover:text-primary-dark transition-colors'
                >
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
