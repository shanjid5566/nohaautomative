import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../config';

const HERO_IMG =
  'https://www.figma.com/api/mcp/asset/dcd6ff2f-02d4-4139-9fca-d87f0d1ffe90';

const OTP_LENGTH = 5;

const OtpVerification = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email || '';

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);

  /* Auto-focus first box on mount */
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  /* Resend countdown */
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const id = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [resendCooldown]);

  const handleChange = useCallback((index, value) => {
    /* Accept only a single digit */
    const digit = value.replace(/\D/g, '').slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    setError('');
    /* Advance focus */
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, []);

  const handleKeyDown = useCallback(
    (index, e) => {
      if (e.key === 'Backspace') {
        if (digits[index]) {
          setDigits((prev) => {
            const next = [...prev];
            next[index] = '';
            return next;
          });
        } else if (index > 0) {
          inputRefs.current[index - 1]?.focus();
          setDigits((prev) => {
            const next = [...prev];
            next[index - 1] = '';
            return next;
          });
        }
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [digits],
  );

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    setDigits((prev) => {
      const next = [...prev];
      pasted.split('').forEach((ch, i) => {
        next[i] = ch;
      });
      return next;
    });
    setError('');
    const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  }, []);

  const handleVerify = useCallback(async () => {
    const code = digits.join('');
    if (code.length < OTP_LENGTH) {
      setError('Please enter all 5 digits.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 600));
      /* On success → Reset Password page */
      navigate(ROUTES.RESET_PASSWORD, { replace: true });
    } finally {
      setIsLoading(false);
    }
  }, [digits, navigate]);

  const handleResend = useCallback(async () => {
    if (resendCooldown > 0) return;
    setDigits(Array(OTP_LENGTH).fill(''));
    setError('');
    setResendCooldown(60);
    inputRefs.current[0]?.focus();
    await new Promise((res) => setTimeout(res, 400));
  }, [resendCooldown]);

  return (
    <div className='min-h-dvh flex'>
      {/* ── Left: hero photo ── */}
      <div className='hidden lg:block lg:w-1/2 relative overflow-hidden shrink-0'>
        <img
          src={HERO_IMG}
          alt='Vintage car in yellow wildflower field'
          className='absolute inset-0 w-full h-full object-cover pointer-events-none'
        />
      </div>

      {/* ── Right: white panel ── */}
      <div className='flex-1 bg-white flex items-center justify-center shadow-[-7px_0px_11.4px_0px_rgba(0,0,0,0.25)] overflow-y-auto'>
        {/* max-w-98 = card content 328px = exactly fits 5×49px boxes + 4×20px gaps = 325px */}
        <div className='w-full max-w-98 py-12 flex items-center justify-center'>
          {/* Card — matches Figma: white bg, border, rounded-sm, p-8, gap-6 */}
          <div className='bg-white border border-[#e4e7e9] rounded-sm p-8 flex flex-col gap-6 w-full'>
            {/* Heading */}
            <div className='flex flex-col gap-2'>
              <h1 className="font-manrope font-bold text-[22px] text-ink leading-8">
                OTP Verification
              </h1>
              <p className="font-manrope font-semibold text-sm text-secondary tracking-[0.07px] leading-normal">
                Enter the verification code we just sent to your email address
                {email && <span className='text-primary'> {email}</span>}
              </p>
            </div>

            {/* OTP boxes */}
            <div className='flex gap-5 items-center'>
              {digits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  type='text'
                  inputMode='numeric'
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  aria-label={`OTP digit ${i + 1}`}
                  className={`w-12.25 h-12.25 shrink-0 text-center font-manrope font-bold text-[22px] text-[#1c2035] tracking-[0.065px] rounded-[6.5px] outline-none transition-colors
                    ${
                      digit
                        ? 'border-[1.633px] border-primary'
                        : 'border-[1.633px] border-secondary bg-[rgba(230,240,248,0.02)]'
                    }
                    focus:border-primary focus:ring-2 focus:ring-primary/20`}
                />
              ))}
            </div>

            {error && <p className='text-xs text-red-600 -mt-2'>{error}</p>}

            {/* Actions */}
            <div className='flex flex-col gap-4 items-center'>
              {/* Verify button */}
              <button
                type='button'
                onClick={handleVerify}
                disabled={isLoading}
                className="bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white h-12 w-full rounded-xl font-manrope font-bold text-base tracking-[0.04px] flex items-center justify-center gap-2 transition-colors"
              >
                {isLoading ? (
                  <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                ) : (
                  'Verify'
                )}
              </button>

              {/* Resend */}
              <p className="font-manrope font-semibold text-[11px] text-ink tracking-[0.07px] text-center">
                Didn&apos;t receive a code?{' '}
                <button
                  type='button'
                  onClick={handleResend}
                  disabled={resendCooldown > 0}
                  className="font-manrope font-bold text-sm text-primary hover:text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {resendCooldown > 0
                    ? `Resend (${resendCooldown}s)`
                    : 'Resend'}
                </button>
              </p>
            </div>

            {/* Back link */}
            <p className="font-manrope font-normal text-[13px] text-secondary text-center">
              Wrong email?{' '}
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className='text-primary font-semibold hover:text-primary-dark transition-colors'
              >
                Go back
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
