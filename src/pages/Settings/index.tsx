/* eslint-disable react-hooks/set-state-in-effect */
import {
  useEffect,
  useState,
  type FormEvent,
} from 'react';

import { useTaskContext } from '../../contexts/TaskContext';

import styles from './styles.module.css';

export function Settings() {
  const {
    taskConfig,
    updateTaskConfig,
    activeTask,
    showNotification,
  } = useTaskContext();

  const [workTime, setWorkTime] = useState(
    taskConfig.workTime,
  );

  const [shortBreakTime, setShortBreakTime] =
    useState(taskConfig.shortBreakTime);

  const [longBreakTime, setLongBreakTime] =
    useState(taskConfig.longBreakTime);

  useEffect(() => {
    setWorkTime(taskConfig.workTime);

    setShortBreakTime(
      taskConfig.shortBreakTime,
    );

    setLongBreakTime(
      taskConfig.longBreakTime,
    );
  }, [taskConfig]);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    updateTaskConfig({
      workTime,
      shortBreakTime,
      longBreakTime,
    });
  }

  function handleReset() {
    const defaultConfig = {
      workTime: 25,
      shortBreakTime: 5,
      longBreakTime: 15,
    };

    setWorkTime(defaultConfig.workTime);

    setShortBreakTime(
      defaultConfig.shortBreakTime,
    );

    setLongBreakTime(
      defaultConfig.longBreakTime,
    );

    updateTaskConfig(defaultConfig);

    showNotification({
    title: 'Configurações restauradas',
    message:
      'Os tempos foram restaurados para o padrão.',
    type: 'info',
  });
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>

          <h1>Configurações</h1>

          <p>
            Escolha a duração de cada ciclo do seu
            Pomodoro.
          </p>
        </div>

      </header>

      <form
        className={styles.settingsCard}
        onSubmit={handleSubmit}
      >
        <div className={styles.formGroup}>
          <div className={styles.labelContent}>
            <label htmlFor="workTime">
              Tempo de foco
            </label>

            <span>
              {workTime} min
            </span>
          </div>

          <input
            id="workTime"
            type="number"
            min="1"
            max="120"
            step="1"
            value={workTime}
            disabled={Boolean(activeTask)}
            onChange={event =>
              setWorkTime(
                Number(event.target.value),
              )
            }
          />

          <small>
            Duração do ciclo principal de trabalho ou
            estudo.
          </small>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.labelContent}>
            <label htmlFor="shortBreakTime">
              Descanso curto
            </label>

            <span>
              {shortBreakTime} min
            </span>
          </div>

          <input
            id="shortBreakTime"
            type="number"
            min="1"
            max="60"
            step="1"
            value={shortBreakTime}
            disabled={Boolean(activeTask)}
            onChange={event =>
              setShortBreakTime(
                Number(event.target.value),
              )
            }
          />

          <small>
            Pausa rápida entre os ciclos de foco.
          </small>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.labelContent}>
            <label htmlFor="longBreakTime">
              Descanso longo
            </label>

            <span>
              {longBreakTime} min
            </span>
          </div>

          <input
            id="longBreakTime"
            type="number"
            min="1"
            max="120"
            step="1"
            value={longBreakTime}
            disabled={Boolean(activeTask)}
            onChange={event =>
              setLongBreakTime(
                Number(event.target.value),
              )
            }
          />

          <small>
            Pausa maior depois de completar uma sequência
            de ciclos.
          </small>
        </div>

        {activeTask && (
          <div className={styles.warning}>
            Existe um ciclo em andamento. Finalize ou
            interrompa o ciclo antes de alterar os tempos.
          </div>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.resetButton}
            onClick={handleReset}
            disabled={Boolean(activeTask)}
          >
            Restaurar padrão
          </button>

          <button
            type="submit"
            className={styles.saveButton}
            disabled={Boolean(activeTask)}
          >
            Salvar configurações
          </button>
        </div>
      </form>
    </main>
  );
}