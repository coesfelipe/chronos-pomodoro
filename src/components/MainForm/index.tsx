import { LockIcon, PlayCircleIcon } from 'lucide-react';
import { Button } from '../Button';
import { Cycles } from '../Cycles';
import { Input } from '../Input';
import { useTaskContext } from '../../contexts/TaskContext';
import { useState, type FormEvent } from 'react';

export function MainForm() {

  const [taskName, setTaskName] = useState('');

  const {
    activeTask,
    startTask,
    interruptTask,
  } = useTaskContext();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedTaskName = taskName.trim();

    if (!normalizedTaskName) {
      alert('Digite o nome da tarefa.');
      return;
    }

    startTask(normalizedTaskName);
  }

  return (
    <form className='form' action='' onSubmit={handleSubmit}>
      <div className='formRow'>
        <Input
          id='meuInput'
          labelText='task'
          type='text'
          placeholder='Digite algo'
          value={taskName}
          disabled={Boolean(activeTask)}
          onChange={event => setTaskName(event.target.value)}
        />
      </div>

      <div className='formRow'>
        <p>Cada ciclo dura 5 minutos.</p>
      </div>

      <div className='formRow'>
        <Cycles />
      </div>

      <div className='formRow'>
        
         {!activeTask ? (
        <Button type="submit" icon={<PlayCircleIcon />} />

         
      ) : (
        <Button type="button" color="red" icon={<LockIcon />} onClick={interruptTask} />
      )}
      </div>
    </form>
  );
}
