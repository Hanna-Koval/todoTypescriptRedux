import { Checkbox, IconButton, Tooltip } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GradeIcon from '@mui/icons-material/Grade';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import StyledTextInput from '../../custom-elements/customTextInput';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { Todo, todoActions } from '../../store/reducer';
import { maxHeight, styleHoverButtons } from './styleMui';
import './todo.scss';

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
        <Checkbox
          checked={el.important}
          onChange={handleChangeCheckboxImportant}
          icon={<GradeOutlinedIcon />}
          checkedIcon={<GradeIcon />}
          sx={styleHoverButtons}
        />
        <Checkbox
          checked={el.completed}
          onChange={handleChangeCheckboxCompleted}
          disabled={isEdit}
          sx={styleHoverButtons}
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
          <Tooltip title="Cancel editing" arrow>
            <IconButton onClick={handleCancel}>
              <SettingsBackupRestoreIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Edit" arrow>
            <IconButton
              onClick={handleIsEdit}
              disabled={el.completed}
              sx={maxHeight}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Delete" arrow>
          <IconButton onClick={handleDelete} sx={maxHeight}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
});

export default TodoEl;
