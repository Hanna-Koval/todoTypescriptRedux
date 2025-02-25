import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { todoActions } from '../store';
import './addTodo.scss';
import AddInput from './addInput';
import AddButton from './addButton';

interface FormInput {
  todo: string;
}

const AddTodo = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState<string>('');
  const { handleSubmit } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    if (todo !== '') {
      dispatch(todoActions.add(data.todo));
      console.log('submit form');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-add-todo">
        <div className="container-add-todo-input">
          <AddInput setTodo={setTodo} todo={todo} />
        </div>
        <div className="button-add-container">
          <AddButton setTodo={setTodo} todo={todo} />
        </div>
      </div>
    </form>
  );
};

export default AddTodo;
