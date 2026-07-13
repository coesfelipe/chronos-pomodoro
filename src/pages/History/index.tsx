import { useTaskContext } from '../../contexts/TaskContext';
import type { TaskModel } from '../../models/TaskModel';

import styles from './styles.module.css';

export function History() {
  const { tasks } = useTaskContext();

  const orderedTasks = [...tasks].reverse();

  function formatDate(timestamp: number | null) {
    if (!timestamp) {
      return '-';
    }

    return new Date(timestamp).toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  }

  function formatDuration(duration: number) {
    if (duration < 1) {
      return `${Math.round(duration * 60)} segundos`;
    }

    return `${duration} ${
      duration === 1 ? 'minuto' : 'minutos'
    }`;
  }

  function getTaskStatus(task: TaskModel) {
    if (task.completeDate !== null) {
      return {
        text: 'Concluído',
        className: styles.completed,
      };
    }

    if (task.interruptDate !== null) {
      return {
        text: 'Interrompido',
        className: styles.interrupted,
      };
    }

    return {
      text: 'Em andamento',
      className: styles.inProgress,
    };
  }

  function getCycleName(type: TaskModel['type']) {
    const cycleNames = {
      workTime: 'Foco',
      shortBreakTime: 'Descanso curto',
      longBreakTime: 'Descanso longo',
    };

    return cycleNames[type];
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div>

          <h1>Histórico</h1>

          <p>
            Veja todos os ciclos iniciados, concluídos ou
            interrompidos.
          </p>
        </div>

      </header>

      {orderedTasks.length === 0 ? (
        <section className={styles.emptyHistory}>
          <h2>Nenhum ciclo encontrado</h2>

          <p>
            Quando você iniciar um ciclo, ele aparecerá
            aqui.
          </p>

        </section>
      ) : (
        <section className={styles.taskList}>
          {orderedTasks.map(task => {
            const status = getTaskStatus(task);

            return (
              <article
                className={styles.taskCard}
                key={task.id}
              >
                <div className={styles.taskInformation}>
                  <div className={styles.taskTitle}>
                    <h2>{task.name}</h2>

                    <span className={styles.cycleType}>
                      {getCycleName(task.type)}
                    </span>
                  </div>

                  <p>
                    Iniciado em {formatDate(task.startDate)}
                  </p>

                  {task.completeDate && (
                    <p>
                      Concluído em{' '}
                      {formatDate(task.completeDate)}
                    </p>
                  )}

                  {task.interruptDate && (
                    <p>
                      Interrompido em{' '}
                      {formatDate(task.interruptDate)}
                    </p>
                  )}
                </div>

                <div className={styles.taskDetails}>
                  <span className={styles.duration}>
                    {formatDuration(task.duration)}
                  </span>

                  <span className={status.className}>
                    {status.text}
                  </span>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}