import { render, screen, fireEvent } from '@testing-library/react';
import AppWrapper from './AppWrapper';

describe('App', () => {
  test('render App', () => {
    render(<AppWrapper />);
    const headerElement = screen.getByText(/todos/i);
    expect(headerElement).toBeInTheDocument();
  });
  test('add new task', () => {
    render(<AppWrapper />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    const taskText = 'Task';
    fireEvent.change(input, { target: { value: taskText } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    const todoItem = screen.getByText(taskText);
    expect(todoItem).toBeInTheDocument();
  });
});
