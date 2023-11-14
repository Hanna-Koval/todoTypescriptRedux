import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoActions } from '../../store';
import './addTodo.scss';

const AddTodo = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState('');
  return (
    <Grid container className="containerAddTodo">
      <Grid item xs={11}>
        <TextField
          id="outlined-basic"
          label="Add a task"
          variant="outlined"
          fullWidth
          size="small"
          value={todo}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTodo(event.target.value);
          }}
        />
      </Grid>
      <Grid item xs={1}>
        <Button
          onClick={() => {
            dispatch(todoActions.add(todo));
            setTodo('');
          }}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddTodo;
