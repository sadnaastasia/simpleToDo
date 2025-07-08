import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markDone, type RootState } from '../store';

function Task({ id, text, done }: { id: number; text: string; done: boolean }) {
  const dispatch = useDispatch();
  const hide = useSelector((state: RootState) => state.tasks.hide);

  const [checked, setChecked] = useState<boolean>(done);

  const handleClick = () => {
    setChecked(!checked);
    dispatch(markDone(id));
  };
  return (
    <div className={`task ${hide ? 'task-hide' : ''}`} onClick={handleClick}>
      <input
        id={id.toString()}
        type="radio"
        className="task_input"
        checked={checked}
      />
      <label className={`task_label ${checked ? 'task_label-crossed' : ''}`}>
        {text}
      </label>
    </div>
  );
}

export default Task;
