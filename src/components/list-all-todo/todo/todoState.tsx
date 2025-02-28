import { Checkbox } from '@mui/material';
import React from 'react';
import GradeIcon from '@mui/icons-material/Grade';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import { styleHoverButtons } from './styleMui';

interface PropsTodoState {
  important: boolean;
  completed: boolean;
  isEdit: boolean;
  handleChangeCheckboxImportant: () => void;
  handleChangeCheckboxCompleted: () => void;
}

const TodoState = ({
  important,
  completed,
  isEdit,
  handleChangeCheckboxImportant,
  handleChangeCheckboxCompleted,
}: PropsTodoState) => {
  return (
    <>
      <Checkbox
        checked={important}
        onChange={handleChangeCheckboxImportant}
        icon={<GradeOutlinedIcon />}
        checkedIcon={<GradeIcon />}
        sx={styleHoverButtons}
      />
      <Checkbox
        checked={completed}
        onChange={handleChangeCheckboxCompleted}
        disabled={isEdit}
        sx={styleHoverButtons}
      />
    </>
  );
};

export default TodoState;
