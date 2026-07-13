import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';

import { NotificationContainer } from './components/NotificationContainer';
import { TaskContextProvider } from './contexts/TaskContext';
import { router } from './routes/router';

import './styles/theme.css';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TaskContextProvider>
      <NotificationContainer />
      <RouterProvider router={router} />
    </TaskContextProvider>
  </StrictMode>,
);