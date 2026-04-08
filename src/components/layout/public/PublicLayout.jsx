import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = memo(() => {
  return <Outlet />;
});

PublicLayout.displayName = 'PublicLayout';

export default PublicLayout;
