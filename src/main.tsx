import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '@mantine/core/styles.css';
import {
  MantineProvider,
  DirectionProvider,
  localStorageColorSchemeManager,
} from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { theme } from './theme/indes.ts';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './hooks/theme-provider.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@mantine/dates/styles.css';
import { Analytics } from '@vercel/analytics/react';

export const router = createBrowserRouter([{ path: '*', element: <App /> }]);
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const colorSchemeManager = localStorageColorSchemeManager({
  key: 'vite-ui-theme',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DirectionProvider initialDirection="rtl" detectDirection>
      <MantineProvider
        theme={theme}
        defaultColorScheme="dark"
        colorSchemeManager={colorSchemeManager}
      >
        <ThemeProvider storageKey="vite-ui-theme" defaultTheme="dark">
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools
              initialIsOpen={false}
              position="bottom"
              buttonPosition="bottom-left"
            />
          </QueryClientProvider>
        </ThemeProvider>
      </MantineProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </DirectionProvider>
    <Analytics />
  </React.StrictMode>
);
