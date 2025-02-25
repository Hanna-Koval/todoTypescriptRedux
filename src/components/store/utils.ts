import { Todo } from './reducer';

export const sortItem = (todo: Todo[]): Todo[] => {
  return todo.sort(
    (el1, el2) =>
      +el2.important - +el1.important || +el1.completed - +el2.completed
  );
};
