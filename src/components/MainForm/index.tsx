import { PlayCircleIcon } from 'lucide-react';
import { Button } from '../Button';
import { Cycles } from '../Cycles';
import { Input } from '../Input';

export function MainForm() {
  return (
    <form className='form' action=''>
      <div className='formRow'>
        <Input
          id='meuInput'
          labelText='task'
          type='text'
          placeholder='Digite algo'
        />
      </div>

      <div className='formRow'>
        <p>Cada ciclo dura 5 minutos.</p>
      </div>

      <div className='formRow'>
        <Cycles />
      </div>

      <div className='formRow'>
        <Button icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}
