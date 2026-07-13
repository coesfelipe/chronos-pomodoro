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

    if (activeTask) return; // trava caso o submit dispare enquanto já há task ativa

    handleStart();
  }

  function handleInterruptTask() {
    interruptTask();

    showNotification({
      title: 'Ciclo interrompido',
      message: `${activeTask?.name} foi cancelado.`,
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
        
        {activeTask ? "Seu ultimo ciclo foi " + activeTask.name : "Nenhum ciclo foi iniciado."}
          
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