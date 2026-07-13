/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import type { TaskModel } from '../../models/TaskModel';
import type { TaskConfigModel } from '../../models/TaskConfigModel';

type CycleType =
  | 'workTime'
  | 'shortBreakTime'
  | 'longBreakTime';

type AppNotification = {
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info';
};

type TaskContextValue = {
  tasks: TaskModel[];
  activeTask: TaskModel | null;
  secondsRemaining: number;
  formattedSecondsRemaining: string;
  currentCycle: number;
  taskConfig: TaskConfigModel;

  notification: AppNotification | null;

  showNotification: (
    notification: AppNotification,
  ) => void;
  clearHistory: () => void;
  closeNotification: () => void;

  startTask: (taskName: string) => void;

  interruptTask: () => void;

  updateTaskConfig: (
    newConfig: TaskConfigModel,
  ) => void;
};

type TaskContextProviderProps = {
  children: ReactNode;
};

const TaskContext =
  createContext<TaskContextValue | null>(null);

const defaultTaskConfig: TaskConfigModel = {
  workTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
};

function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds) % 60;

  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds,
  ).padStart(2, '0')}`;
}

export function getCycleType(
  cycle: number,
): CycleType {
  if (cycle % 8 === 0) {
    return 'longBreakTime';
  }

  if (cycle % 2 === 0) {
    return 'shortBreakTime';
  }

  return 'workTime';
}

export function TaskContextProvider({
  children,
}: TaskContextProviderProps) {
  const [tasks, setTasks] = useState<TaskModel[]>(
    () => {
      const savedTasks = localStorage.getItem(
        'chronos-pomodoro:tasks',
      );

      if (!savedTasks) {
        return [];
      }

      try {
        return JSON.parse(
          savedTasks,
        ) as TaskModel[];
      } catch {
        return [];
      }
    },
  );

  const [activeTask, setActiveTask] =
    useState<TaskModel | null>(null);

  const [
    secondsRemaining,
    setSecondsRemaining,
  ] = useState(0);

  const [currentCycle, setCurrentCycle] =
    useState(0);

  const [notification, setNotification] =
    useState<AppNotification | null>(null);

  const [taskConfig, setTaskConfig] =
    useState<TaskConfigModel>(() => {
      const savedConfig = localStorage.getItem(
        'chronos-pomodoro:config',
      );

      if (!savedConfig) {
        return defaultTaskConfig;
      }

      try {
        return JSON.parse(
          savedConfig,
        ) as TaskConfigModel;
      } catch {
        return defaultTaskConfig;
      }
    });

  function showNotification(
    newNotification: AppNotification,
  ) {
    setNotification(newNotification);
  }

  function clearHistory() {
  if (activeTask) {
    showNotification({
      title: 'Ciclo em andamento',
      message:
        'Interrompa ou conclua o ciclo antes de limpar o histórico.',
      type: 'warning',
    });

    return;
  }

  setTasks([]);
  setCurrentCycle(0);
  setSecondsRemaining(0);

  showNotification({
    title: 'Histórico limpo',
    message:
      'A sequência de ciclos começará novamente pelo foco.',
    type: 'success',
  });
}

  function closeNotification() {
    setNotification(null);
  }

  function updateTaskConfig(
    newConfig: TaskConfigModel,
  ) {
    if (activeTask) {
      showNotification({
        title: 'Ciclo em andamento',
        message:
          'Finalize ou interrompa o ciclo antes de alterar os tempos.',
        type: 'warning',
      });

      return;
    }

    const hasInvalidValue =
      newConfig.workTime <= 0 ||
      newConfig.shortBreakTime <= 0 ||
      newConfig.longBreakTime <= 0;

    if (hasInvalidValue) {
      showNotification({
        title: 'Configuração inválida',
        message:
          'Todos os tempos precisam ser maiores que zero.',
        type: 'warning',
      });

      return;
    }

    setTaskConfig(newConfig);

    showNotification({
      title: 'Configurações salvas',
      message:
        'Os tempos dos ciclos foram atualizados.',
      type: 'success',
    });
  }

  function startTask(taskName: string) {
    const name = taskName.trim();

    if (!name || activeTask) {
      return;
    }

    const nextCycle = currentCycle + 1;
    const cycleType = getCycleType(nextCycle);
    const duration = taskConfig[cycleType];

    const newTask: TaskModel = {
      id: crypto.randomUUID(),
      name,
      duration,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      type: cycleType,
    };

    setTasks(previousTasks => [
      ...previousTasks,
      newTask,
    ]);

    setActiveTask(newTask);
    setCurrentCycle(nextCycle);

    setSecondsRemaining(
      Math.round(duration * 60),
    );

    const cycleMessages = {
      workTime: {
        title: 'Hora de focar',
        message: `${name} foi iniciado.`,
      },

      shortBreakTime: {
        title: 'Descanso curto',
        message:
          'Relaxe um pouco antes do próximo foco.',
      },

      longBreakTime: {
        title: 'Descanso longo',
        message:
          'Você completou uma sequência de ciclos.',
      },
    };

    showNotification({
      ...cycleMessages[cycleType],
      type: 'info',
    });
  }

  function interruptTask() {
    if (!activeTask) {
      return;
    }

    const activeTaskId = activeTask.id;
    const activeTaskName = activeTask.name;

    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === activeTaskId
          ? {
              ...task,
              interruptDate: Date.now(),
            }
          : task,
      ),
    );

    setActiveTask(null);
    setSecondsRemaining(0);

    showNotification({
      title: 'Ciclo interrompido',
      message: `${activeTaskName} foi cancelado.`,
      type: 'warning',
    });
  }

  useEffect(() => {
    localStorage.setItem(
      'chronos-pomodoro:tasks',
      JSON.stringify(tasks),
    );
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(
      'chronos-pomodoro:config',
      JSON.stringify(taskConfig),
    );
  }, [taskConfig]);

  useEffect(() => {
    if (!activeTask) {
      return;
    }

    const activeTaskId = activeTask.id;
    const activeTaskName = activeTask.name;

    const intervalId = window.setInterval(() => {
      setSecondsRemaining(previousSeconds => {
        if (previousSeconds > 1) {
          return previousSeconds - 1;
        }

        window.clearInterval(intervalId);

        setTasks(previousTasks =>
          previousTasks.map(task =>
            task.id === activeTaskId &&
            task.interruptDate === null
              ? {
                  ...task,
                  completeDate: Date.now(),
                }
              : task,
          ),
        );

        setActiveTask(currentTask =>
          currentTask?.id === activeTaskId
            ? null
            : currentTask,
        );

        showNotification({
          title: 'Ciclo concluído',
          message: `${activeTaskName} foi concluído.`,
          type: 'success',
        });

        return 0;
      });
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [activeTask]);

  const formattedSecondsRemaining =
    formatSeconds(secondsRemaining);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        activeTask,
        secondsRemaining,
        formattedSecondsRemaining,
        currentCycle,
        taskConfig,
        clearHistory,
        notification,
        showNotification,
        closeNotification,
        startTask,
        interruptTask,
        updateTaskConfig,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      'useTaskContext deve ser usado dentro de TaskContextProvider',
    );
  }

  return context;
}