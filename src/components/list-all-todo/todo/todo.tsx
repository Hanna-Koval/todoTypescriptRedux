import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import StyledTextInput from '../../custom-elements/customTextInput';
import { Todo, todoActions } from '../../store/reducer';
import './todo.scss';
import TodoState from './todoState';
import { CancelButton, DeleteButton, EditButton } from './todoActions';

interface PropsTodoEl {
  el: Todo;
}

const TodoEl = React.forwardRef<HTMLDivElement, PropsTodoEl>(({ el }, ref) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>(el.text);

  const handleSave = useCallback(() => {
    dispatch(
      todoActions.edit({
        id: el.id,
        text: newText,
        completed: el.completed,
        important: el.important,
      })
    );
    setIsEdit?.(false);
  }, [el.id, el.completed, el.important, newText, dispatch]);

  const handleCancel = useCallback(() => {
    setNewText(el.text);
    setIsEdit?.(false);
  }, [el.text]);

  const handleChangeInput = (e: string) => {
    setNewText(e);
  };

  const handleChangeCheckboxImportant = () =>
    dispatch(todoActions.important(el.id));

  const handleChangeCheckboxCompleted = () =>
    dispatch(todoActions.check(el.id));

  const handleDelete = () => dispatch(todoActions.delete(el));

  const handleIsEdit = () => setIsEdit(true);

  return (
    <div className="all-row-todo-container" ref={ref}>
      <div className="checkbox-and-text">
        <TodoState
          important={el.important}
          completed={el.completed}
          isEdit={isEdit}
          handleChangeCheckboxImportant={handleChangeCheckboxImportant}
          handleChangeCheckboxCompleted={handleChangeCheckboxCompleted}
        />
      </div>
      <div className="container-text-or-input">
        {isEdit ? (
          <StyledTextInput
            id="outlined-read-only-input"
            value={newText}
            focused={true}
            multiline={true}
            onChange={handleChangeInput}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <span
            className={el.completed ? 'crossed-text text-style' : 'text-style'}
          >
            {el.text}
          </span>
        )}
      </div>
      <div className="container-buttons-edit-delete">
        {isEdit ? (
          <CancelButton handleCancel={handleCancel} />
        ) : (
          <EditButton handleIsEdit={handleIsEdit} completed={el.completed} />
        )}
        <DeleteButton handleDelete={handleDelete} />
      </div>
    </div>
  );
});

export default TodoEl;
