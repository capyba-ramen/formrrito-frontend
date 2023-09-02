import * as React from 'react';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

const ErrorBoundaryLayout = () => (
  <ErrorBoundary>
    <React.Suspense fallback="Loading...">
      <Outlet />
    </React.Suspense>
  </ErrorBoundary>
);

ErrorBoundaryLayout.displayName = 'ErrorBoundaryLayout';

export default ErrorBoundaryLayout;
