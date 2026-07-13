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
        path: paths.history,
        lazy: async () => {
          const { History } = await import('../pages/History');
          return { Component: History };
        },
      },
      {
        path: paths.settings,
        lazy: async () => {
          const { Settings } = await import('../pages/Settings');
          return { Component: Settings };
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