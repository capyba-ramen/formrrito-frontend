import * as React from 'react';
import { Outlet } from 'react-router-dom';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import PageSpinner from '@/components/PageSpinner/PageSpinner';

const ErrorBoundaryLayout = () => (
  <ErrorBoundary>
    <React.Suspense fallback={<PageSpinner />}>
      <Outlet />
    </React.Suspense>
  </ErrorBoundary>
);

ErrorBoundaryLayout.displayName = 'ErrorBoundaryLayout';

export default ErrorBoundaryLayout;
