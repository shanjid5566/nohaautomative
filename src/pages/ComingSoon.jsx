import React from 'react';
import { useLocation } from 'react-router-dom';

const ComingSoon = () => {
  const { pathname } = useLocation();
  const pageName = pathname.split('/').pop().replace(/-/g, ' ');

  return (
    <div className='flex items-center justify-center min-h-[60vh]'>
      <div className='text-center flex flex-col items-center gap-4'>
        <div className='w-16 h-16 rounded-full bg-primary-light flex items-center justify-center text-3xl'>
          🚧
        </div>
        <h1 className="font-poppins font-semibold text-2xl text-ink capitalize">
          {pageName}
        </h1>
        <p className="font-inter text-secondary">
          Coming soon — Figma design will be integrated here.
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
