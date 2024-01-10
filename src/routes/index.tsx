import ErrorBoundaryLayout from '../layouts/ErrorBoundary/ErrorBoundaryLayout';
import Forms from '../pages/Forms/Forms';
import FormFiller from '../pages/FormFiller/FormFiller';
import FormBuilder from '../pages/FormBuilder/FormBuilder';
import BusinessLayout from '../layouts/BusinessLayout/BusinessLayout';
import ConsumerLayout from '../layouts/ConsumerLayout/ConsumerLayout';
import NotFound from '../pages/NotFound/NotFound';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: '/form',
        element: <BusinessLayout />,
        children: [{ path: ':formId', element: <FormBuilder /> }],
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
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
