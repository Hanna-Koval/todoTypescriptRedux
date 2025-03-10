import { Todo } from './reducer';

export const sortItem = (todo: Todo[]): Todo[] => {
  return todo.sort(
    (el1, el2) =>
      +el1.completed - +el2.completed || +el2.important - +el1.important
  );
};
