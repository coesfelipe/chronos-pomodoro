import { useEffect } from 'react';

import styles from './styles.module.css';

type NotificationType =
  | 'success'
  | 'warning'
  | 'info';

type NotificationProps = {
  title: string;
  message: string;
  type?: NotificationType;
  onClose: () => void;
};

export function Notification({
  title,
  message,
  type = 'info',
  onClose,
}: NotificationProps) {
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [onClose]);

  return (
    <div
      className={`${styles.notification} ${styles[type]}`}
    >
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