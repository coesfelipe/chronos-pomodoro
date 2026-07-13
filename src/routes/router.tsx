import { createBrowserRouter } from 'react-router';

import { MainTemplate } from '../templates/MainTemplate';
import { paths } from './paths';

export const router = createBrowserRouter([
  {
    path: paths.home,
    element: <MainTemplate />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { Home } = await import('../pages/Home');
          return { Component: Home };
        },
      },
      {
        path: 'about',
        lazy: async () => {
          const { AboutPomodoro } = await import('../pages/AboutPomodoro');
          return { Component: AboutPomodoro };
        },
      },
      {
        path: '*',
        lazy: async () => {
          const { NotFound } = await import('../pages/NotFound');
          return { Component: NotFound };
        },
      },
    ] } ] );