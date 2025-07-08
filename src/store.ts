import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface TasksState {
  tasks: Task[];
  value: number;
  filteredTasks: Task[];
  typeOfFilter: string;
  hide: boolean;
}

const initialState: TasksState = {
  tasks: [],
  value: 0,
  filteredTasks: [],
  typeOfFilter: 'all',
  hide: false,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      let filteredTasksArray = [];
      if (state.typeOfFilter === 'all') {
        filteredTasksArray = [...state.tasks, action.payload];
      } else if (state.typeOfFilter === 'completed') {
        filteredTasksArray = [...state.tasks, action.payload].filter(
          (task) => task.done === true
        );
      } else
        filteredTasksArray = [...state.tasks, action.payload].filter(
          (task) => task.done === false
        );
      return {
        ...state,
        value: state.value + 1,
        tasks: [...state.tasks, action.payload],
        filteredTasks: filteredTasksArray,
      };
    },
    deleteDoneTasks: (state) => {
      const doneTasks = state.tasks.filter((task) => task.done !== true);
      return {
        ...state,
        value: doneTasks.length,
        tasks: doneTasks,
        filteredTasks: state.filteredTasks.filter((task) => task.done !== true),
      };
    },
    markDone: (state, action) => {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, done: !task.done } : task
        ),
        filteredTasks: state.filteredTasks.map((task) =>
          task.id === action.payload ? { ...task, done: !task.done } : task
        ),
      };
    },
    showAll: (state) => {
      return {
        ...state,
        filteredTasks: state.tasks,
        typeOfFilter: 'all',
      };
    },
    showCompleted: (state) => {
      return {
        ...state,
        filteredTasks: state.tasks.filter((task) => task.done === true),
        typeOfFilter: 'completed',
      };
    },
    showActive: (state) => {
      return {
        ...state,
        filteredTasks: state.tasks.filter((task) => task.done === false),
        typeOfFilter: 'active',
      };
    },
    hide: (state) => {
      return {
        ...state,
        hide: !state.hide,
      };
    },
  },
});

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
  },
});

export const {
  addTask,
  deleteDoneTasks,
  markDone,
  showAll,
  showCompleted,
  showActive,
  hide,
} = tasksSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
