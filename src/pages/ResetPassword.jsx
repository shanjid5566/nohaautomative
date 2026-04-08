import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { ROUTES } from '../config';

const HERO_IMG =
  'https://www.figma.com/api/mcp/asset/c07f3e1e-289c-4ff8-ba0a-04e8cfd7b185';

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError('');

      if (password.length < 8) {
        setError('Password must be at least 8 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      setIsLoading(true);
      try {
        /* TODO: call reset-password API */
        await new Promise((res) => setTimeout(res, 600));
        navigate(ROUTES.LOGIN, { replace: true });
      } finally {
        setIsLoading(false);
      }
    },
    [password, confirmPassword, navigate],
  );

  return (
    <div className='min-h-dvh flex'>
      {/* ── Left: hero photo ── */}
      <div className='hidden lg:block lg:w-1/2 relative overflow-hidden shrink-0'>
        <img
          src={HERO_IMG}
          alt='Sports car by the ocean at sunset'
          className='absolute inset-0 w-full h-full object-cover pointer-events-none'
        />
      </div>

      {/* ── Right: white panel ── */}
      <div className='flex-1 bg-white flex items-center justify-center shadow-[-7px_0px_11.4px_0px_rgba(0,0,0,0.25)] overflow-y-auto'>
        <div className='w-full max-w-106 py-12 flex items-center justify-center'>
          {/* Card */}
          <div className='bg-white border border-[#e4e7e9] rounded-sm p-8 flex flex-col gap-6 w-full'>
            {/* Heading */}
            <div className='flex flex-col gap-3'>
              <h1 className="font-semibold text-xl text-ink leading-7">
                Reset Password
              </h1>
              <p className="font-normal text-sm text-secondary leading-5">
                Create a new password. It must be at least 8 characters.
              </p>
            </div>

            {/* Fields */}
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              {/* Password */}
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='rp-password'
                  className="font-normal text-sm text-[#191c1f] leading-5"
                >
                  Password
                </label>
                <div className='relative'>
                  <input
                    id='rp-password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder='8+ characters'
                    autoComplete='new-password'
                    className="w-full h-11 bg-primary-light border border-[#e4e7e9] rounded-xs px-3.75 pr-10.5 font-normal text-sm text-ink placeholder:text-subtle leading-5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    className='absolute right-3.75 top-1/2 -translate-y-1/2 text-subtle hover:text-secondary transition-colors'
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='rp-confirm'
                  className="font-normal text-sm text-[#191c1f] leading-5"
                >
                  Confirm Password
                </label>
                <div className='relative'>
                  <input
                    id='rp-confirm'
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError('');
                    }}
                    autoComplete='new-password'
                    className="w-full h-11 bg-primary-light border border-[#e4e7e9] rounded-xs px-3.75 pr-10.5 font-normal text-sm text-ink placeholder:text-subtle leading-5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    className='absolute right-3.75 top-1/2 -translate-y-1/2 text-subtle hover:text-secondary transition-colors'
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-600 -mt-1">
                  {error}
                </p>
              )}

              {/* Submit button */}
              <button
                type='submit'
                disabled={isLoading}
                className="bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white h-12 w-full rounded-xs font-bold text-sm tracking-[0.168px] uppercase flex items-center justify-center gap-2 transition-colors"
              >
                {isLoading ? (
                  <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                ) : (
                  <>
                    Reset Password
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            {/* Back to login */}
            <p className="font-normal text-sm text-secondary text-center leading-5">
              Remember your password?{' '}
              <Link
                to={ROUTES.LOGIN}
                className='text-primary font-semibold hover:text-primary-dark transition-colors underline'
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
