import { combineReducers } from 'redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sortItem } from './utils';
import { arrayMove } from '@dnd-kit/sortable';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  important: boolean;
}

const initialState: Todo[] = [];

export const reducers = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    add: (state: Todo[], action: PayloadAction<string>) => {
      state.unshift({
        id: Math.random().toString(16).slice(2),
        text: action.payload,
        completed: false,
        important: false,
      });
    },
    delete: (state: Todo[], action: PayloadAction<Todo>) => {
      const { id } = action.payload;
      return state.filter((todo) => id !== todo.id);
    },
    check: (state: Todo[], action: PayloadAction<string>) => {
      return sortItem(
        state.map((todo) =>
          action.payload === todo.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      );
    },
    important: (state: Todo[], action: PayloadAction<string>) => {
      return sortItem(
        state.map((todo) =>
          action.payload === todo.id
            ? { ...todo, important: !todo.important }
            : todo
        )
      );
    },
    edit: (state: Todo[], action: PayloadAction<Todo>) => {
      const { id, text } = action.payload;
      return state.map((todo) => (id === todo.id ? { ...todo, text } : todo));
    },
    swopeItems: (
      state: Todo[],
      action: PayloadAction<{ activeId: string; overId: string }>
    ) => {
      const { activeId, overId } = action.payload;
      const oldIndex = state.findIndex(({ id }) => id === activeId);
      const newIndex = state.findIndex(({ id }) => id === overId);
      return arrayMove(state, oldIndex, newIndex);
    },
  },
});

export const todoActions = reducers.actions;

const rootReducer = combineReducers({
  todos: reducers.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
