import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import CustomTextInput from '../custom-elements';

interface FormInput {
  todo: string;
}

interface PropsTodoEl {
  todo: string;
  setTodo: (e: string) => void;
}

const AddInput = ({ todo, setTodo }: PropsTodoEl) => {
  const handleChange = (e: string) => {
    setTodo(e);
  };

  const { control } = useForm<FormInput>();

  return (
    <Controller
      name="todo"
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <CustomTextInput
          {...field}
          id="outlined-basic"
          label="Add a task"
          value={todo}
          onChange={handleChange}
        />
      )}
    />
  );
};

export default AddInput;
