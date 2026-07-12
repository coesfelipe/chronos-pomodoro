import styles from './styles.module.css';

import { useTaskContext } from '../../contexts/TaskContext';

export function CountDown() {

  const {
    formattedSecondsRemaining,
  } = useTaskContext();

  return <div className={styles.container}>{formattedSecondsRemaining}</div>;
}
