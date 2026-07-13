/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import type { TaskModel } from '../../models/TaskModel';

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

  notification: AppNotification | null;

  showNotification: (
    notification: AppNotification
  ) => void;

  closeNotification: () => void;
  startTask: (taskName: string) => void;
  interruptTask: () => void;
};

type TaskContextProviderProps = {
  children: ReactNode;
};

const TaskContext =
  createContext<TaskContextValue | null>(null);

const taskConfig = {
  workTime: 0.3,
  shortBreakTime: 0.3,
  longBreakTime: 0.3,
};

function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds,
  ).padStart(2, '0')}`;
}

export function getCycleType(cycle: number): CycleType {
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
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  const [activeTask, setActiveTask] =
    useState<TaskModel | null>(null);

  const [secondsRemaining, setSecondsRemaining] =
    useState(0);

  const [currentCycle, setCurrentCycle] = useState(0);

  const [notification, setNotification] =
    useState<AppNotification | null>(null);

  function showNotification(
    newNotification: AppNotification,
  ) {
    setNotification(newNotification);
  }

  function closeNotification() {
    setNotification(null);
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
    setSecondsRemaining(duration * 60);

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
        notification,
        showNotification,
        closeNotification,
        startTask,
        interruptTask,
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
