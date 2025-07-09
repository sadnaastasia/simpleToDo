import { render, screen } from '@testing-library/react';
import AppWrapper from './AppWrapper';
import {
  addTask,
  deleteDoneTasks,
  hide,
  markDone,
  showActive,
  showAll,
  showCompleted,
} from './store';
import { tasksSlice } from './store';

describe('App', () => {
  test('render App', () => {
    render(<AppWrapper />);
    const headerElement = screen.getByText(/todos/i);
    expect(headerElement).toBeInTheDocument();
  });
  test('add task', () => {
    const initialState = {
      tasks: [],
      value: 0,
      filteredTasks: [],
      typeOfFilter: 'all',
      hide: false,
    };
    const task = { id: 1, text: 'Task 1', done: false };
    const action = addTask(task);
    const nextState = tasksSlice.reducer(initialState, action);
    expect(nextState).toEqual({
      tasks: [{ id: 1, text: 'Task 1', done: false }],
      value: 1,
      filteredTasks: [{ id: 1, text: 'Task 1', done: false }],
      typeOfFilter: 'all',
      hide: false,
    });
  });
  test('mark task done', () => {
    const initialState = {
      tasks: [{ id: 1, text: 'Task 1', done: false }],
      value: 1,
      filteredTasks: [{ id: 1, text: 'Task 1', done: false }],
      typeOfFilter: 'all',
      hide: false,
    };
    const action = markDone(1);
    const nextState = tasksSlice.reducer(initialState, action);
    expect(nextState).toEqual({
      tasks: [{ id: 1, text: 'Task 1', done: true }],
      value: 1,
      filteredTasks: [{ id: 1, text: 'Task 1', done: true }],
      typeOfFilter: 'all',
      hide: false,
    });
  });
  test('delete done tasks', () => {
    const initialState = {
      tasks: [
        { id: 1, text: 'Task 1', done: true },
        { id: 2, text: 'Task 2', done: true },
        { id: 3, text: 'Task 3', done: false },
      ],
      value: 3,
      filteredTasks: [
        { id: 1, text: 'Task 1', done: true },
        { id: 2, text: 'Task 2', done: true },
        { id: 3, text: 'Task 3', done: false },
      ],
      typeOfFilter: 'all',
      hide: false,
    };
    const action = deleteDoneTasks();
    const nextState = tasksSlice.reducer(initialState, action);
    expect(nextState).toEqual({
      tasks: [{ id: 3, text: 'Task 3', done: false }],
      value: 1,
      filteredTasks: [{ id: 3, text: 'Task 3', done: false }],
      typeOfFilter: 'all',
      hide: false,
    });
  });
  test('show all tasks', () => {
    const initialState = {
      tasks: [
        { id: 1, text: 'Task 1', done: true },
        { id: 2, text: 'Task 2', done: true },
        { id: 3, text: 'Task 3', done: false },
      ],
      value: 3,
      filteredTasks: [
        { id: 1, text: 'Task 1', done: true },
        { id: 2, text: 'Task 2', done: true },
        { id: 3, text: 'Task 3', done: false },
      ],
      typeOfFilter: 'all',
      hide: false,
    };
    const action = showAll();
    const nextState = tasksSlice.reducer(initialState, action);
    expect(nextState).toEqual({
      tasks: [
        { id: 1, text: 'Task 1', done: true },
        { id: 2, text: 'Task 2', done: true },
        { id: 3, text: 'Task 3', done: false },
      ],
      value: 3,
      filteredTasks: [
        { id: 1, text: 'Task 1', done: true },
        { id: 2, text: 'Task 2', done: true },
        { id: 3, text: 'Task 3', done: false },
      ],
      typeOfFilter: 'all',
      hide: false,
    });
  });
  test('show active tasks', () => {
    const initialState = {
      tasks: [
        { id: 1, text: 'Task 1', done: true },
        { id: 2, text: 'Task 2', done: true },
        { id: 3, text: 'Task 3', done: false },
      ],
      value: 3,
      filteredTasks: [
        { id: 1, text: 'Task 1', done: true },
        { id: 2, text: 'Task 2', done: true },
        { id: 3, text: 'Task 3', done: false },
      ],
      typeOfFilter: 'all',
      hide: false,
    };
    const action = showActive();
    const nextState = tasksSlice.reducer(initialState, action);
    expect(nextState).toEqual({
      tasks: [
        { id: 1, text: 'Task 1', done: true },
        { id: 2, text: 'Task 2', done: true },
        { id: 3, text: 'Task 3', done: false },
      ],
      value: 3,
      filteredTasks: [{ id: 3, text: 'Task 3', done: false }],
      typeOfFilter: 'active',
      hide: false,
    });
  });
  test('show completed tasks', () => {
    const initialState = {
      tasks: [
        { id: 1, text: 'Task 1', done: true },
        { id: 2, text: 'Task 2', done: true },
        { id: 3, text: 'Task 3', done: false },
      ],
      value: 3,
      filteredTasks: [
        { id: 1, text: 'Task 1', done: true },
        { id: 2, text: 'Task 2', done: true },
        { id: 3, text: 'Task 3', done: false },
      ],
      typeOfFilter: 'all',
      hide: false,
    };
    const action = showCompleted();
    const nextState = tasksSlice.reducer(initialState, action);
    expect(nextState).toEqual({
      tasks: [
        { id: 1, text: 'Task 1', done: true },
        { id: 2, text: 'Task 2', done: true },
        { id: 3, text: 'Task 3', done: false },
      ],
      value: 3,
      filteredTasks: [
        { id: 1, text: 'Task 1', done: true },
        { id: 2, text: 'Task 2', done: true },
      ],
      typeOfFilter: 'completed',
      hide: false,
    });
  });
  test('hide tasks', () => {
    const initialState = {
      tasks: [
        { id: 1, text: 'Task 1', done: true },
        { id: 2, text: 'Task 2', done: true },
        { id: 3, text: 'Task 3', done: false },
      ],
      value: 3,
      filteredTasks: [
        { id: 1, text: 'Task 1', done: true },
        { id: 2, text: 'Task 2', done: true },
        { id: 3, text: 'Task 3', done: false },
      ],
      typeOfFilter: 'all',
      hide: false,
    };
    const action = hide();
    const nextState = tasksSlice.reducer(initialState, action);
    expect(nextState).toEqual({
      tasks: [
        { id: 1, text: 'Task 1', done: true },
        { id: 2, text: 'Task 2', done: true },
        { id: 3, text: 'Task 3', done: false },
      ],
      value: 3,
      filteredTasks: [
        { id: 1, text: 'Task 1', done: true },
        { id: 2, text: 'Task 2', done: true },
        { id: 3, text: 'Task 3', done: false },
      ],
      typeOfFilter: 'all',
      hide: true,
    });
  });
});
