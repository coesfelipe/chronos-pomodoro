import styles from './styles.module.css';

import {
  getCycleType,
  useTaskContext,
} from '../../contexts/TaskContext';

export function Cycles() {
  const { currentCycle } = useTaskContext();

  const cycleDots = Array.from({
    length: currentCycle,
  });

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>

      <div className={styles.cyclesDots}>
        {cycleDots.map((_, index) => {
          const cycleNumber = index + 1;
          const cycleType = getCycleType(cycleNumber);

          return (
            <span
              key={cycleNumber}
              className={`${styles.cycleDot} ${styles[cycleType]}`}
            />
          );
        })}
      </div>
    </div>
  );
}