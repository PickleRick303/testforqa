import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppComponent from './app';
import { BrowserRouter } from 'react-router-dom';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import dayjs from 'dayjs';
import localeUk from 'dayjs/locale/uk';
import { Routes, Route } from 'react-router-dom';
import duration from 'dayjs/plugin/duration';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
dayjs.locale(localeUk);
dayjs.extend(duration);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // For example: retry failed queries 2 times
      // ... other default options
    },
  },
});

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <QueryClientProvider client={queryClient}>
    <AppComponent />
  </QueryClientProvider>,
);
