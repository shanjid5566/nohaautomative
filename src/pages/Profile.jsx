import React, { useState, useCallback, useRef } from 'react';
import { Eye, EyeOff, Camera } from 'lucide-react';

const DEFAULT_AVATAR =
  'https://www.figma.com/api/mcp/asset/de6e0d46-9732-4753-9f52-527426118ef1';

const Profile = () => {
  const fileInputRef = useRef(null);

  /* ── Account form ── */
  const [account, setAccount] = useState({
    firstName: 'Kevin',
    lastName: '',
    email: 'customer@gmail.com',
    phone: '+1-202-555-0118',
    address: 'Amsterdam, Netherlands',
  });
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [accountSaving, setAccountSaving] = useState(false);

  /* ── Password form ── */
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });
  const [showPw, setShowPw] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });
  const [pwError, setPwError] = useState('');
  const [pwSaving, setPwSaving] = useState(false);

  const handleAccountChange = useCallback((e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAvatarChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  }, []);

  const handleSaveAccount = useCallback(async (e) => {
    e.preventDefault();
    setAccountSaving(true);
    try {
      await new Promise((res) => setTimeout(res, 600));
    } finally {
      setAccountSaving(false);
    }
  }, []);

  const handlePasswordChange = useCallback((e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    setPwError('');
  }, []);

  const handleSavePassword = useCallback(
    async (e) => {
      e.preventDefault();
      if (passwords.newPass.length < 8) {
        setPwError('New password must be at least 8 characters.');
        return;
      }
      if (passwords.newPass !== passwords.confirm) {
        setPwError('Passwords do not match.');
        return;
      }
      setPwSaving(true);
      try {
        await new Promise((res) => setTimeout(res, 600));
        setPasswords({ current: '', newPass: '', confirm: '' });
      } finally {
        setPwSaving(false);
      }
    },
    [passwords],
  );

  const inputClass =
    "w-full h-11 border border-dim rounded-sm px-3.75 bg-white font-normal text-sm text-dim placeholder-[#77878f] leading-5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors";

  return (
    <div className='flex flex-col gap-4 md:gap-6 p-4 md:p-0'>
      {/* Account Setting card */}
      <div className='border border-dim rounded-sm overflow-hidden'>
        {/* Card heading */}
        <div className='h-12 md:h-13 border-b border-dim flex items-center px-4 md:px-5.75'>
          <span className="font-medium text-sm text-dim uppercase tracking-wide leading-5">
            Account Setting
          </span>
        </div>

        <form onSubmit={handleSaveAccount} className='p-4 md:p-6 flex flex-col md:flex-row gap-6'>
          {/* Avatar column */}
          <div className='md:shrink-0 flex flex-col items-center md:items-start relative'>
            <div className='relative w-40 h-40 md:w-44 md:h-44 rounded-full overflow-hidden bg-[#efefef]'>
              <img
                src={avatar}
                alt='Profile avatar'
                className='w-full h-full object-cover'
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_AVATAR;
                }}
              />
            </div>
            {/* Camera button */}
            <button
              type='button'
              onClick={() => fileInputRef.current?.click()}
              aria-label='Change avatar'
              className='absolute md:static bottom-4 right-4 md:bottom-auto md:right-auto md:mt-3 w-10 h-10 bg-primary-light border-2 border-white rounded-full flex items-center justify-center hover:bg-[#e0d4ff] transition-colors'
            >
              <Camera size={18} className='text-primary' />
            </button>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleAvatarChange}
              className='hidden'
            />
          </div>

          {/* Fields column */}
          <div className='flex-1 flex flex-col gap-4'>
            {/* First + Last name */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='prof-firstName'
                  className="font-roboto font-normal text-sm text-dim leading-5.5"
                >
                  First name
                </label>
                <input
                  id='prof-firstName'
                  name='firstName'
                  type='text'
                  value={account.firstName}
                  onChange={handleAccountChange}
                  className={inputClass}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='prof-lastName'
                  className="font-roboto font-normal text-sm text-dim leading-5.5"
                >
                  Last name
                </label>
                <input
                  id='prof-lastName'
                  name='lastName'
                  type='text'
                  value={account.lastName}
                  onChange={handleAccountChange}
                  placeholder='Display name'
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email + Phone */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='prof-email'
                  className="font-roboto font-normal text-sm text-dim leading-5.5"
                >
                  Email
                </label>
                <input
                  id='prof-email'
                  name='email'
                  type='email'
                  value={account.email}
                  onChange={handleAccountChange}
                  className={inputClass}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='prof-phone'
                  className="font-roboto font-normal text-sm text-dim leading-5.5"
                >
                  Phone Number
                </label>
                <input
                  id='prof-phone'
                  name='phone'
                  type='tel'
                  value={account.phone}
                  onChange={handleAccountChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Address */}
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='prof-address'
                className="font-normal text-sm text-dim leading-5"
              >
                Address
              </label>
              <input
                id='prof-address'
                name='address'
                type='text'
                value={account.address}
                onChange={handleAccountChange}
                className={inputClass}
              />
            </div>

            {/* Save button */}
            <button
              type='submit'
              disabled={accountSaving}
              className="self-start bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-[#feffff] font-bold text-sm tracking-[0.168px] uppercase px-6 h-12  flex items-center gap-2 transition-colors rounded-xl"
            >
              {accountSaving ? (
                <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Change Password card */}
      <div className='border border-dim rounded-sm overflow-hidden'>
        {/* Card heading */}
        <div className='h-12 md:h-13 border-b border-dim flex items-center px-4 md:px-5.75'>
          <span className="font-medium text-sm text-dim uppercase tracking-wide leading-5">
            Change Password
          </span>
        </div>

        <form
          onSubmit={handleSavePassword}
          className='p-4 md:p-6 flex flex-col gap-4'
        >
          {/* Current Password */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='pw-current'
              className="font-normal text-sm text-dim leading-5"
            >
              Current Password
            </label>
            <div className='relative'>
              <input
                id='pw-current'
                name='current'
                type={showPw.current ? 'text' : 'password'}
                value={passwords.current}
                onChange={handlePasswordChange}
                autoComplete='current-password'
                className={inputClass + ' pr-10.5'}
              />
              <button
                type='button'
                onClick={() =>
                  setShowPw((v) => ({ ...v, current: !v.current }))
                }
                className='absolute right-3.75 top-1/2 -translate-y-1/2 text-[#77878f] hover:text-dim transition-colors'
              >
                {showPw.current ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='pw-new'
              className="font-normal text-sm text-dim leading-5"
            >
              New Password
            </label>
            <div className='relative'>
              <input
                id='pw-new'
                name='newPass'
                type={showPw.newPass ? 'text' : 'password'}
                value={passwords.newPass}
                onChange={handlePasswordChange}
                placeholder='8+ characters'
                autoComplete='new-password'
                className={inputClass + ' pr-10.5'}
              />
              <button
                type='button'
                onClick={() =>
                  setShowPw((v) => ({ ...v, newPass: !v.newPass }))
                }
                className='absolute right-3.75 top-1/2 -translate-y-1/2 text-[#77878f] hover:text-dim transition-colors'
              >
                {showPw.newPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='pw-confirm'
              className="font-normal text-sm text-dim leading-5"
            >
              Confirm Password
            </label>
            <div className='relative'>
              <input
                id='pw-confirm'
                name='confirm'
                type={showPw.confirm ? 'text' : 'password'}
                value={passwords.confirm}
                onChange={handlePasswordChange}
                autoComplete='new-password'
                className={inputClass + ' pr-10.5'}
              />
              <button
                type='button'
                onClick={() =>
                  setShowPw((v) => ({ ...v, confirm: !v.confirm }))
                }
                className='absolute right-3.75 top-1/2 -translate-y-1/2 text-[#77878f] hover:text-dim transition-colors'
              >
                {showPw.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {pwError && (
            <p className="text-xs text-red-600">
              {pwError}
            </p>
          )}

          {/* Change Password button */}
          <button
            type='submit'
            disabled={pwSaving}
            className="self-start bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-[#feffff] font-bold text-sm tracking-[0.168px] uppercase px-6 h-12 rounded-xl flex items-center gap-2 transition-colors"
          >
            {pwSaving ? (
              <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
            ) : (
              'Change Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
