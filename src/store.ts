import { arrayMove } from '@dnd-kit/sortable';
import {
  PayloadAction,
  configureStore,
  createSlice,
  combineReducers,
} from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  important: boolean;
}

const initialState: Todo[] = [];

export const mainSlice = createSlice({
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
      return state.map((todo) =>
        action.payload === todo.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
    important: (state: Todo[], action: PayloadAction<string>) => {
      return state.map((todo) =>
        action.payload === todo.id
          ? { ...todo, important: !todo.important }
          : todo
      );
    },
    edit: (state: Todo[], action: PayloadAction<Todo>) => {
      const { id, text } = action.payload;
      return state.map((todo) => (id === todo.id ? { ...todo, text } : todo));
    },
    swapeItems: (
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

export const todoActions = mainSlice.actions;

const rootReducer = combineReducers({
  todos: mainSlice.reducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
