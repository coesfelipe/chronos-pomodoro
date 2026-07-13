import { useTaskContext } from './contexts/TaskContext';
import { Home } from './pages/Home';
import { Notification } from './components/Notification';

import './styles/theme.css';
import './styles/global.css';

export function App() {
  const {
    notification,
    closeNotification,
  } = useTaskContext();

  return (
    <>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      <Home />
    </>
  );
}