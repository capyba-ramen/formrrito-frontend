import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SWRConfig } from 'swr';

import ErrorBoundaryLayout from '@/layouts/ErrorBoundary/ErrorBoundaryLayout';
import BusinessLayout from '@/layouts/BusinessLayout/BusinessLayout';
import ConsumerLayout from '@/layouts/ConsumerLayout/ConsumerLayout';
import NotFound from '@/pages/NotFound/NotFound';
import NotificationProvider from '@/components/NotificationProvider/NotificationProvider';
import DialogProvider from '@/components/DialogProvider/DialogProvider';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/configs/settings/theme.config.ts';
import swrConfig from '@/configs/settings/swr.config';

import '@/configs/style/global.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Forms = React.lazy(() => import('@/pages/Forms/Forms'));
const FormFiller = React.lazy(() => import('@/pages/FormFiller/FormFiller'));
const FormEdit = React.lazy(() => import('@/pages/FormEdit/FormEdit'));
const Go = React.lazy(() => import('@/pages/Go/Go'));

const router = createBrowserRouter([
  {
    element: (
      <ThemeProvider theme={theme}>
        <SWRConfig value={swrConfig}>
          <NotificationProvider>
            <DialogProvider>
              <ErrorBoundaryLayout />
            </DialogProvider>
          </NotificationProvider>
        </SWRConfig>
      </ThemeProvider>
    ),
    children: [
      {
        path: '/form',
        element: <BusinessLayout />,
        children: [{ path: ':formId', element: <FormEdit /> }],
      },
      {
        path: '/forms',
        element: <BusinessLayout />,
        children: [{ path: '', element: <Forms /> }],
      },
      {
        path: '/c-form',
        element: <ConsumerLayout />,
        children: [{ path: ':formId', element: <FormFiller /> }],
      },
      {
        path: '/u/:shortenedUrl',
        element: <Go />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
