import {
  Checkbox,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import React, { ChangeEvent, forwardRef, useState } from 'react';
import { Todo, todoActions } from '../../store';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import GradeIcon from '@mui/icons-material/Grade';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';

interface PropsTodoEl {
  el: Todo;
}

const TodoEl = forwardRef<HTMLDivElement, PropsTodoEl>((props, ref) => {
  const { el } = props;
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>('');
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <div className="all-row-todo-container" ref={ref}>
      <div className="checkbox-and-text">
        <Checkbox
          {...label}
          checked={el.important}
          onChange={() => dispatch(todoActions.important(el.id))}
          icon={<GradeOutlinedIcon />}
          checkedIcon={<GradeIcon />}
        />
        <Checkbox
          checked={el.completed}
          onChange={() => {
            console.log('check');
            dispatch(todoActions.check(el.id));
          }}
          inputProps={{ 'aria-label': 'controlled' }}
          disabled={isEdit}
        />
        {isEdit ? (
          <OutlinedInput
            id="outlined-read-only-input"
            defaultValue={el.text}
            className="text-style"
            fullWidth
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setNewText(e.target?.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setNewText(newText);
                    dispatch(
                      todoActions.edit({
                        id: el.id,
                        text: newText,
                        completed: el.completed,
                        important: el.important,
                      })
                    );
                    setIsEdit(false);
                  }}
                  edge="end"
                >
                  <CheckIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <p className={el.completed ? 'crossed-text' : 'text-style'}>
            {el.text}
          </p>
        )}
      </div>
      <div>
        <IconButton
          onClick={() => setIsEdit(true)}
          disabled={el.completed || isEdit}
        >
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => dispatch(todoActions.delete(el))}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
});

export default TodoEl;
