import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoActions } from '../../store';
import './addTodo.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import StyledTextInput from '../custom-elements/customTextInput';

interface FormInput {
  todo: string;
}

const AddTodo = () => {
  const { handleSubmit, control } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(todoActions.add(data.todo));
  };

  const dispatch = useDispatch();
  const [todo, setTodo] = useState<string>('');
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container className="container-add-todo">
        <Grid item xs={10}>
          <Controller
            name="todo"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <StyledTextInput
                {...field}
                id="outlined-basic"
                label="Add a task"
                value={todo}
                onChange={(event: string) => {
                  setTodo(event);
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={2} className="button-add-container">
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
