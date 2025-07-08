import { useState, type KeyboardEvent } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  deleteDoneTasks,
  showActive,
  showAll,
  showCompleted,
  hide,
  type RootState,
} from './store';
import Task from './components/Task';
import { RiArrowDownWideFill } from 'react-icons/ri';
import { RiArrowUpWideLine } from 'react-icons/ri';

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const tasksFiltered = useSelector(
    (state: RootState) => state.tasks.filteredTasks
  );
  const hideTasks = useSelector((state: RootState) => state.tasks.hide);

  const [newTask, setNewTask] = useState<string>('');
  const [selected, setSelected] = useState<string>('all');

  const numberOfTasksLeft = tasks.filter((task) => task.done == false).length;

  const handleEnter = (e: KeyboardEvent) => {
    if (newTask === '') {
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      setNewTask('');
      dispatch(
        addTask({
          id: tasks.length !== 0 ? tasks[tasks.length - 1].id + 1 : 1,
          text: newTask,
          done: false,
        })
      );
    }
  };

  const handleClearCompleted = () => {
    dispatch(deleteDoneTasks());
  };

  const handleAll = () => {
    dispatch(showAll());
    setSelected('all');
  };
  const handleActive = () => {
    dispatch(showActive());
    setSelected('active');
  };
  const handleCompleted = () => {
    dispatch(showCompleted());
    setSelected('completed');
  };

  const handleArrowClick = () => {
    dispatch(hide());
  };
  return (
    <div className="wrapper">
      <h1 className="title">todos</h1>
      <div className="todo">
        <div className="input-wrapper">
          <button className="arrow-button" onClick={handleArrowClick}>
            {hideTasks ? (
              <RiArrowDownWideFill className="arrow-button_svg" />
            ) : (
              <RiArrowUpWideLine className="arrow-button_svg" />
            )}
          </button>
          <input
            id="input"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="input"
            onKeyUp={handleEnter}
            placeholder="What needs to be done?"
          />
        </div>
        {tasksFiltered.map((task) => (
          <Task key={task.id} id={task.id} done={task.done} text={task.text} />
        ))}
        <div className="control-bar">
          <span className="control-bar_left-items">
            {numberOfTasksLeft} items left
          </span>
          <div className="control-bar_buttons-set">
            <button
              className={`control-bar_button ${
                selected === 'all' ? 'control-bar_button-selected' : ''
              }`}
              onClick={handleAll}
            >
              All
            </button>
            <button
              className={`control-bar_button ${
                selected === 'active' ? 'control-bar_button-selected' : ''
              }`}
              onClick={handleActive}
            >
              Active
            </button>
            <button
              className={`control-bar_button ${
                selected === 'completed' ? 'control-bar_button-selected' : ''
              }`}
              onClick={handleCompleted}
            >
              Completed
            </button>
          </div>
          <button className="control-bar_button" onClick={handleClearCompleted}>
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
