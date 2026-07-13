import { useState, type FormEvent } from 'react';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';

import { Button } from '../Button';
import { Cycles } from '../Cycles';
import { Input } from '../Input';
import { useTaskContext } from '../../contexts/TaskContext';

export function MainForm() {
  const [taskName, setTaskName] = useState('');

  const {
    tasks,
    activeTask,
    startTask,
    interruptTask,
    showNotification,
  } = useTaskContext();

  const lastTask = tasks.at(-1);

  const taskUsedToCalculateNextCycle = activeTask ?? lastTask;

  const nextCycle =
    taskUsedToCalculateNextCycle?.type === 'workTime'
      ? 'Descanso curto'
      : taskUsedToCalculateNextCycle?.type === 'shortBreakTime'
        ? 'Trabalho'
        : taskUsedToCalculateNextCycle?.type === 'longBreakTime'
          ? 'Trabalho'
          : null;

  function handleStart() {
    const normalizedTaskName = taskName.trim();

    if (!normalizedTaskName) {
      showNotification({
        title: 'Digite uma tarefa',
        message: 'Informe o nome da tarefa antes de iniciar o ciclo.',
        type: 'warning',
      });

      return;
    }

    startTask(normalizedTaskName);
    setTaskName('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (activeTask) return;

    handleStart();
  }

  function handleInterruptTask() {
    const interruptedTaskName = activeTask?.name;

    interruptTask();

    showNotification({
      title: 'Ciclo interrompido',
      message: interruptedTaskName
        ? `${interruptedTaskName} foi cancelado.`
        : 'O ciclo foi cancelado.',
      type: 'warning',
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="formRow">
        <Input
          id="meuInput"
          labelText="Tarefa"
          type="text"
          placeholder="Digite algo"
          value={taskName}
          disabled={Boolean(activeTask)}
          onChange={event => setTaskName(event.target.value)}
        />
      </div>

      <div className="formRow">
        {nextCycle
          ? `Próximo ciclo: ${nextCycle}`
          : 'Nenhum ciclo foi iniciado.'}
      </div>

      <div className="formRow">
        <Cycles />
      </div>

      <div className="formRow">
        {!activeTask ? (
          <Button
            type="button"
            icon={<PlayCircleIcon />}
            onClick={handleStart}
            aria-label="Iniciar ciclo"
          />
        ) : (
          <Button
            type="button"
            color="red"
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
            aria-label="Interromper ciclo"
          />
        )}
      </div>
    </form>
  );
}