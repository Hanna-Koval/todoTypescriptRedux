import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoActions } from '../../store';
import './addTodo.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface FormInput {
  todo: string;
}

const AddTodo = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(todoActions.add(data.todo));
  };

  const dispatch = useDispatch();
  const [todo, setTodo] = useState<string>('');
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container className="containerAddTodo">
        <Grid item xs={11}>
          <Controller
            name="todo"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
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
            )}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            type="submit"
            onClick={() => {
              todo && dispatch(todoActions.add(todo));
              setTodo('');
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddTodo;
