import {
  PayloadAction,
  configureStore,
  createSlice,
  combineReducers,
} from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  text: string;
  completed?: boolean;
}

const initialState: Todo[] = [];

export const mainSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    add: (state: Todo[], action: PayloadAction<string>) => {
      state.push({
        id: Math.random().toString(16).slice(2),
        text: action.payload,
        completed: false,
      });
    },
    delete: (state: Todo[], action: PayloadAction<Todo>) => {
      const { text } = action.payload;
      for (let todo of state) {
        if (text === todo.text) {
        }
      }
    },
    check: (state: Todo[], action: PayloadAction<string>) => {
      return state.map((todo) =>
        action.payload === todo.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
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
