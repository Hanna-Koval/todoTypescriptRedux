import { Button } from '@mui/material';
import React from 'react';
import { todoActions } from '../store';
import { useDispatch } from 'react-redux';

interface PropsAdd {
  todo: string;
  setTodo: (str: string) => void;
}

const AddButton = ({ todo, setTodo }: PropsAdd) => {
  const dispatch = useDispatch();
  const handleSubmitClick = () => {
    todo !== '' && dispatch(todoActions.add(todo));
    setTodo('');
    console.log('submit button');
  };
  return (
    <Button type="submit" onClick={handleSubmitClick}>
      Add
    </Button>
  );
};

export default AddButton;
