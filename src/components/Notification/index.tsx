import { useEffect } from 'react';
import styles from './styles.module.css';

type NotificationType = 'success' | 'warning' | 'info';

type NotificationProps = {
  title: string;
  message: string;
  type?: NotificationType;
  duration?: number;
  onClose: () => void;
};

export function Notification({
  title,
  message,
  type = 'info',
  duration = 5000,
  onClose,
}: NotificationProps) {
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      window.clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <div className={styles.content}>
        <strong>{title}</strong>
        <p>{message}</p>
      </div>

      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Fechar notificação"
      >
        ×
      </button>
    </div>
  );
}