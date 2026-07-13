import { useState, type FormEvent } from 'react';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';

import { Button } from '../Button';
import { Cycles } from '../Cycles';
import { Input } from '../Input';
import { useTaskContext } from '../../contexts/TaskContext';

export function MainForm() {
  const [taskName, setTaskName] = useState('');

  const {
    activeTask,
    startTask,
    interruptTask,
    showNotification,
  } = useTaskContext();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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

  }

  function handleInterruptTask() {
    if (!activeTask) return;

    const activeTaskName = activeTask.name;

    interruptTask();

    showNotification({
      title: 'Ciclo interrompido',
      message: `${activeTaskName} foi cancelado.`,
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
        <p>
          Seu último ciclo foi {activeTask ? activeTask.name : 'nenhum ainda'}.
        </p>
      </div>

      <div className="formRow">
        <Cycles />
      </div>

      <div className="formRow">
        {!activeTask ? (
          <Button
            type="submit"
            icon={<PlayCircleIcon />}
          />
        ) : (
          <Button
            type="button"
            color="red"
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}