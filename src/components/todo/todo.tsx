import { Checkbox, Grid, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { Todo, todoActions } from '../../store';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GradeIcon from '@mui/icons-material/Grade';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import StyledTextInput from '../custom-elements/customTextInput';
import './todo.scss';
import { styleHoverButtons } from '../stylesMui';

interface PropsTodoEl {
  el: Todo;
}

const TodoEl = React.forwardRef<HTMLDivElement, PropsTodoEl>((props, ref) => {
  const { el } = props;
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>(el.text);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const onSave = () => {
    dispatch(
      todoActions.edit({
        id: el.id,
        text: newText,
        completed: el.completed,
        important: el.important,
      })
    );
    setIsEdit?.(false);
  };

  const onCancel = () => {
    setNewText(el.text);
    setIsEdit?.(false);
  };

  return (
    <div className="all-row-todo-container" ref={ref}>
      <Grid container>
        <Grid item xs={10} className="checkbox-and-text">
          <Checkbox
            {...label}
            checked={el.important}
            onChange={() => dispatch(todoActions.important(el.id))}
            icon={<GradeOutlinedIcon />}
            checkedIcon={<GradeIcon />}
            sx={styleHoverButtons}
          />
          <Checkbox
            checked={el.completed}
            onChange={() => {
              dispatch(todoActions.check(el.id));
            }}
            inputProps={{ 'aria-label': 'controlled' }}
            disabled={isEdit}
            sx={styleHoverButtons}
          />
          {isEdit ? (
            <StyledTextInput
              id="outlined-read-only-input"
              value={newText}
              focused={true}
              multiline={true}
              onChange={(e: string) => {
                setNewText(e);
              }}
              onSave={onSave}
              onCancel={onCancel}
            />
          ) : (
            <span
              className={
                el.completed ? 'crossed-text text-style' : 'text-style'
              }
            >
              {el.text}
            </span>
          )}
        </Grid>
        <Grid item xs className="container-buttons-edit-delete">
          <IconButton
            onClick={() => setIsEdit(true)}
            disabled={el.completed || isEdit}
            sx={{ maxHeight: '42px' }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => dispatch(todoActions.delete(el))}
            sx={{ maxHeight: '42px' }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
});

export default TodoEl;
