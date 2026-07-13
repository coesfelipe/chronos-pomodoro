import { useTaskContext } from '../../contexts/TaskContext';
import { Notification } from '../Notification';

export function NotificationContainer() {
  const { notification, closeNotification } = useTaskContext();

  if (!notification) return null;

  return (
    <Notification
      title={notification.title}
      message={notification.message}
      type={notification.type}
      onClose={closeNotification}
    />
  );
}