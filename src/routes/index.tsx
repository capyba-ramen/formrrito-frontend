import ErrorBoundaryLayout from '../layouts/ErrorBoundary/ErrorBoundaryLayout';
import Forms from '../pages/Forms/Forms';
import FormFiller from '../pages/FormFiller/FormFiller';
import FormEdit from '../pages/FormEdit/FormEdit';
import Go from '../pages/Go/Go';
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
