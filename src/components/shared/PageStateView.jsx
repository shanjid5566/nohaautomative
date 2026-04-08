import React, { memo } from 'react';

const SkeletonLine = ({ className = '' }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
);

const ListSkeleton = memo(() => (
  <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5'>
    {Array.from({ length: 6 }).map((_, idx) => (
      <div
        key={idx}
        className='rounded-xl border border-gray-100 bg-white p-4 shadow-sm space-y-3'
      >
        <SkeletonLine className='h-44 w-full' />
        <SkeletonLine className='h-4 w-3/4' />
        <SkeletonLine className='h-4 w-1/2' />
        <SkeletonLine className='h-10 w-full' />
      </div>
    ))}
  </div>
));

ListSkeleton.displayName = 'ListSkeleton';

const DetailSkeleton = memo(() => (
  <div className='space-y-5'>
    <div className='rounded-2xl border border-gray-100 bg-white p-6 space-y-4'>
      <SkeletonLine className='h-8 w-2/3' />
      <SkeletonLine className='h-5 w-full' />
      <SkeletonLine className='h-5 w-4/5' />
    </div>
    <div className='rounded-2xl border border-gray-100 bg-white p-6 space-y-3'>
      <SkeletonLine className='h-5 w-1/3' />
      <SkeletonLine className='h-5 w-full' />
      <SkeletonLine className='h-5 w-full' />
      <SkeletonLine className='h-5 w-2/3' />
    </div>
  </div>
));

DetailSkeleton.displayName = 'DetailSkeleton';

const MessageState = memo(({ title, description, onRetry, tone = 'empty' }) => {
  const toneClass =
    tone === 'error'
      ? 'border-red-200 bg-red-50 text-red-700'
      : 'border-gray-200 bg-white text-gray-700';

  return (
    <div className='flex items-center justify-center py-12'>
      <div className={`w-full max-w-xl rounded-xl border p-6 text-center ${toneClass}`}>
        <h3 className='text-xl font-semibold mb-2'>{title}</h3>
        <p className='text-sm text-gray-500 mb-5'>{description}</p>
        <button
          type='button'
          onClick={onRetry}
          className='inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white hover:bg-primary-dark transition-colors'
        >
          Retry
        </button>
      </div>
    </div>
  );
});

MessageState.displayName = 'MessageState';

const PageStateView = memo(
  ({ status, variant = 'list', onRetry, emptyTitle, emptyDescription }) => {
    if (status === 'loading') {
      return variant === 'detail' ? <DetailSkeleton /> : <ListSkeleton />;
    }

    if (status === 'error') {
      return (
        <MessageState
          tone='error'
          title='Something went wrong'
          description='We could not load the requested data right now.'
          onRetry={onRetry}
        />
      );
    }

    return (
      <MessageState
        tone='empty'
        title={emptyTitle || 'No data found'}
        description={
          emptyDescription || 'There is nothing to show for this section yet.'
        }
        onRetry={onRetry}
      />
    );
  },
);

PageStateView.displayName = 'PageStateView';

export default PageStateView;
