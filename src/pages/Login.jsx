import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';
import { ROUTES } from '../config';
import { Eye, EyeOff } from 'lucide-react';

const HERO_IMG =
  'https://www.figma.com/api/mcp/asset/05f1c3f6-d9c3-4c4e-bf3b-fbdd95918120';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ROLES = [
  { key: 'admin', label: 'Admin', redirect: ROUTES.ADMIN_DASHBOARD },
  { key: 'seller', label: 'Seller', redirect: ROUTES.SELLER_DASHBOARD },
  { key: 'user', label: 'User', redirect: ROUTES.PROFILE },
];

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [role, setRole] = useState('admin');
  const [email, setEmail] = useState('admin@test.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!password) {
      errs.password = 'Password is required.';
    }
    return errs;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 500));
      dispatch(
        loginSuccess({
          user: {
            id: 1,
            name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
            email,
            role,
          },
          token: `demo-token-${Date.now()}`,
        }),
      );
      const target = ROLES.find((r) => r.key === role)?.redirect ?? ROUTES.HOME;
      navigate(target, { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-dvh flex'>
      {/* Left hero photo */}
      <div className='hidden lg:block lg:w-1/2 relative overflow-hidden shrink-0'>
        <img
          src={HERO_IMG}
          alt='Classic car in golden wheat field'
          className='absolute inset-0 w-full h-full object-cover pointer-events-none'
        />
      </div>

      {/* Right white form panel */}
      <div className='flex-1 bg-white flex items-center justify-center shadow-[-7px_0px_11.4px_0px_rgba(0,0,0,0.25)] overflow-y-auto'>
        <div className='w-full max-w-103.5 px-10 py-12 flex flex-col gap-6'>
          {/* Back to Home */}
          <Link
            to={ROUTES.HOME}
            className='self-start flex items-center gap-1.5 font-inter text-sm text-secondary hover:text-primary transition-colors'
          >
            <span aria-hidden='true'>←</span> Back to Home
          </Link>
          {/* Heading */}
          <div className='flex flex-col gap-2'>
            <h1 className='font-poppins font-medium text-2xl text-black leading-normal'>
              Login to Continue
            </h1>
            <p className='font-inter font-normal text-base text-secondary leading-6'>
              Sign in to your account to access your dashboard.
            </p>
          </div>

          {/* Role tabs */}
          <div className='flex gap-0 rounded-[10px] bg-primary-light p-1'>
            {ROLES.map((r) => (
              <button
                key={r.key}
                type='button'
                onClick={() => setRole(r.key)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 font-poppins ${
                  role === r.key
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-transparent text-primary hover:bg-[#e4d9ff]'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={handleLogin}
            noValidate
            className='flex flex-col gap-6'
          >
            <div className='flex flex-col gap-4'>
              {/* Email */}
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='login-email'
                  className='font-poppins font-normal text-base text-black leading-normal'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='login-email'
                  autoComplete='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email here...'
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className='bg-primary-light h-12 rounded-lg px-4 w-full font-inter font-normal text-base text-[#1b1b1b] placeholder:text-subtle border-none outline-none focus:ring-2 focus:ring-primary/30'
                />
                {errors.email && (
                  <p id='email-error' className='text-xs text-red-600'>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='login-password'
                  className='font-poppins font-normal text-base text-black leading-normal'
                >
                  Password
                </label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='login-password'
                    autoComplete='current-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password here...'
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? 'password-error' : undefined
                    }
                    className='bg-primary-light h-12 rounded-lg px-4 pr-11 w-full font-inter font-normal text-base text-[#1b1b1b] placeholder:text-subtle border-none outline-none focus:ring-2 focus:ring-primary/30'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-primary transition-colors'
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p id='password-error' className='text-xs text-red-600'>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Forgot password */}
              <div className='flex justify-end'>
                <Link
                  to={ROUTES.FORGOT_PASSWORD}
                  className='font-poppins font-medium text-base text-primary underline decoration-solid hover:text-primary-dark transition-colors'
                >
                  Forget Password?
                </Link>
              </div>
            </div>

            {/* Sign In button */}
            <button
              type='submit'
              disabled={isLoading}
              className='bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white h-12 rounded-lg w-full font-poppins font-medium text-base text-center transition-colors flex items-center justify-center gap-2'
            >
              {isLoading && (
                <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
              )}
              {isLoading
                ? 'Signing in...'
                : `Sign In as ${ROLES.find((r) => r.key === role)?.label}`}
            </button>
          </form>

          {/* Sign Up link */}
          <p className='font-inter font-normal text-base text-secondary text-center'>
            Don&apos;t Have an account{' '}
            <Link
              to={ROUTES.SIGN_UP}
              className='font-poppins font-semibold text-primary underline decoration-solid hover:text-primary-dark transition-colors'
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
