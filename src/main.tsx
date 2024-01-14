import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './configs/style/global.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material/styles';
import { SWRConfig } from 'swr';
import theme from './configs/settings/theme.config.ts';
import swrConfig from './configs/settings/swr.config';
import AuthProvider from './components/AuthProvider/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <SWRConfig value={swrConfig}>
          <RouterProvider router={router} />
        </SWRConfig>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
