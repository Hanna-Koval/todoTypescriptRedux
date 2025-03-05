import { Todo } from '../reducer';
import { sortItem } from '../utils';

describe('sortItem', () => {
  it('should sort items correctly', () => {
    const initial: Partial<Todo>[] = [
      { id: '1', important: false, completed: true },
      { id: '2', important: false, completed: false },
      { id: '3', important: true, completed: false },
      { id: '4', important: true, completed: true },
    ];
    const final: Partial<Todo>[] = [
      { id: '3', important: true, completed: false },
      { id: '2', important: false, completed: false },
      { id: '4', important: true, completed: true },
      { id: '1', important: false, completed: true },
    ];
    expect(sortItem(initial as Todo[])).toStrictEqual(final);
  });
  it('should return empty array', () => {
    expect(sortItem([])).toEqual([]);
  });
  it('should sort important items on top', () => {
    const initial: Partial<Todo>[] = [
      { id: '1', important: false, completed: false },
      { id: '2', important: false, completed: false },
      { id: '3', important: true, completed: false },
      { id: '4', important: true, completed: false },
    ];
    const final: Partial<Todo>[] = [
      { id: '3', important: true, completed: false },
      { id: '4', important: true, completed: false },
      { id: '1', important: false, completed: false },
      { id: '2', important: false, completed: false },
    ];
    expect(sortItem(initial as Todo[])).toStrictEqual(final);
  });
  it('should sort completed items on bottom', () => {
    const initial: Partial<Todo>[] = [
      { id: '1', important: false, completed: false },
      { id: '2', important: false, completed: true },
      { id: '3', important: false, completed: false },
      { id: '4', important: false, completed: true },
    ];
    const final: Partial<Todo>[] = [
      { id: '1', important: false, completed: false },
      { id: '3', important: false, completed: false },
      { id: '2', important: false, completed: true },
      { id: '4', important: false, completed: true },
    ];
    expect(sortItem(initial as Todo[])).toStrictEqual(final);
  });
  it('should sort all important items on top', () => {
    const initial: Partial<Todo>[] = [
      { id: '1', important: true, completed: false },
      { id: '2', important: true, completed: false },
      { id: '3', important: true, completed: false },
      { id: '4', important: true, completed: false },
    ];
    const final: Partial<Todo>[] = [
      { id: '1', important: true, completed: false },
      { id: '2', important: true, completed: false },
      { id: '3', important: true, completed: false },
      { id: '4', important: true, completed: false },
    ];
    expect(sortItem(initial as Todo[])).toStrictEqual(final);
  });
  it('should sort all completed items on top', () => {
    const initial: Partial<Todo>[] = [
      { id: '1', important: false, completed: true },
      { id: '2', important: false, completed: true },
      { id: '3', important: false, completed: true },
      { id: '4', important: false, completed: true },
    ];
    const final: Partial<Todo>[] = [
      { id: '1', important: false, completed: true },
      { id: '2', important: false, completed: true },
      { id: '3', important: false, completed: true },
      { id: '4', important: false, completed: true },
    ];
    expect(sortItem(initial as Todo[])).toStrictEqual(final);
  });
  it('should sort all equal todos all', () => {
    const initial: Partial<Todo>[] = [
      { id: '1', important: false, completed: false },
      { id: '2', important: false, completed: false },
      { id: '3', important: false, completed: false },
      { id: '4', important: false, completed: false },
    ];
    const final: Partial<Todo>[] = [
      { id: '1', important: false, completed: false },
      { id: '2', important: false, completed: false },
      { id: '3', important: false, completed: false },
      { id: '4', important: false, completed: false },
    ];
    expect(sortItem(initial as Todo[])).toStrictEqual(final);
  });
});
