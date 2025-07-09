import { render, screen } from '@testing-library/react';
import AppWrapper from './AppWrapper';
import { addTask, deleteDoneTasks, markDone } from './store';
import { tasksSlice } from './store';

describe('App', () => {
  test('render App', () => {
    render(<AppWrapper />);
    const headerElement = screen.getByText(/todos/i);
    expect(headerElement).toBeInTheDocument();
  });
  it('add task', () => {
    const initialState = {
      tasks: [],
      value: 0,
      filteredTasks: [],
      typeOfFilter: 'all',
      hide: false,
    };
    const task = { id: 1, text: 'Hi', done: false };
    const action = addTask(task);
    const nextState = tasksSlice.reducer(initialState, action);
    expect(nextState).toEqual({
      tasks: [{ id: 1, text: 'Hi', done: false }],
      value: 1,
      filteredTasks: [{ id: 1, text: 'Hi', done: false }],
      typeOfFilter: 'all',
      hide: false,
    });
  });
  it('mark task done', () => {
    const initialState = {
      tasks: [{ id: 1, text: 'Hi', done: false }],
      value: 1,
      filteredTasks: [{ id: 1, text: 'Hi', done: false }],
      typeOfFilter: 'all',
      hide: false,
    };
    const action = markDone(1);
    const nextState = tasksSlice.reducer(initialState, action);
    expect(nextState).toEqual({
      tasks: [{ id: 1, text: 'Hi', done: true }],
      value: 1,
      filteredTasks: [{ id: 1, text: 'Hi', done: true }],
      typeOfFilter: 'all',
      hide: false,
    });
  });
  it('delete done tasks', () => {
    const initialState = {
      tasks: [
        { id: 1, text: 'Hi', done: true },
        { id: 2, text: 'Hi2', done: true },
        { id: 3, text: 'Hi3', done: false },
      ],
      value: 3,
      filteredTasks: [
        { id: 1, text: 'Hi', done: true },
        { id: 2, text: 'Hi2', done: true },
        { id: 3, text: 'Hi3', done: false },
      ],
      typeOfFilter: 'all',
      hide: false,
    };
    const action = deleteDoneTasks();
    const nextState = tasksSlice.reducer(initialState, action);
    expect(nextState).toEqual({
      tasks: [{ id: 3, text: 'Hi3', done: false }],
      value: 1,
      filteredTasks: [{ id: 3, text: 'Hi3', done: false }],
      typeOfFilter: 'all',
      hide: false,
    });
  });
});
