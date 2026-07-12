/* eslint-disable react-hooks/set-state-in-effect */
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

type TaskConfig = {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
};

type TaskContextValue = {
  tasks: TaskModel[];
  activeTask: TaskModel | null;
  secondsRemaining: number;
  formattedSecondsRemaining: string;
  currentCycle: number;
  startTask: (taskName: string) => void;
  interruptTask: () => void;
};

type TaskContextProviderProps = {
  children: ReactNode;
};

const TaskContext =
  createContext<TaskContextValue | null>(null);

const initialConfig: TaskConfig = {
  workTime: 1,
  shortBreakTime: 1,
  longBreakTime: 1,
};

function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds,
  ).padStart(2, '0')}`;
}

function getNextCycleType(
  currentCycle: number,
): CycleType {
  const nextCycle = currentCycle + 1;

  if (nextCycle % 8 === 0) {
    return 'longBreakTime';
  }

  if (nextCycle % 2 === 0) {
    return 'shortBreakTime';
  }

  return 'workTime';
}

export function TaskContextProvider({
  children,
}: TaskContextProviderProps) {
  const [tasks, setTasks] =
    useState<TaskModel[]>([]);

  const [activeTask, setActiveTask] =
    useState<TaskModel | null>(null);

  const [secondsRemaining, setSecondsRemaining] =
    useState(0);

  const [currentCycle, setCurrentCycle] =
    useState(0);

  function startTask(taskName: string) {
    const normalizedTaskName = taskName.trim();

    if (!normalizedTaskName) {
      return;
    }

    const cycleType =
      getNextCycleType(currentCycle);

    const duration =
      initialConfig[cycleType];

    const task: TaskModel = {
      id: crypto.randomUUID(),
      name: normalizedTaskName,
      duration,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      type: cycleType,
    };

    setTasks(previousTasks => [
      ...previousTasks,
      task,
    ]);

    setActiveTask(task);

    setCurrentCycle(
      previousCycle => previousCycle + 1,
    );

    setSecondsRemaining(duration * 60);
  }

  function interruptTask() {
    if (!activeTask) {
      return;
    }

    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === activeTask.id
          ? {
              ...task,
              interruptDate: Date.now(),
            }
          : task,
      ),
    );

    setActiveTask(null);
    setSecondsRemaining(0);
  }

  useEffect(() => {
    if (!activeTask || secondsRemaining <= 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setSecondsRemaining(previousSeconds =>
        Math.max(previousSeconds - 1, 0),
      );
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [activeTask, secondsRemaining]);

  useEffect(() => {
    if (!activeTask || secondsRemaining !== 0) {
      return;
    }

    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === activeTask.id
          ? {
              ...task,
              completeDate: Date.now(),
            }
          : task,
      ),
    );

    setActiveTask(null);
  }, [activeTask, secondsRemaining]);

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