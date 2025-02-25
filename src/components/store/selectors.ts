import { RootState, Todo } from './reducer';

export const selectors = {
  selectAllTodo: (state: RootState) =>
    state.todos
      .slice()
      .sort(
        (el1: Todo, el2: Todo) =>
          +el1.completed - +el2.completed || +el2.important - +el1.important
      ),
};
