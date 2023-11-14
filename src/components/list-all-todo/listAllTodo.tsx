import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Todo, todoActions } from '../../store';
import { Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './listAllTodo.scss';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const ListTodos = () => {
  const allTodo = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      allTodo,
      result.source.index,
      result.destination.index
    );
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {allTodo.map((el: Todo, index) => (
                <Draggable key={el.id} draggableId={el.id} index={index}>
                  {(provided, snapshot) => (
                    <div key={el.id} className="all-row-todo-container">
                      <div
                        className="checkbox-and-text"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Checkbox
                          checked={el.completed}
                          onChange={() => dispatch(todoActions.check(el.id))}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <p
                          className={
                            el.completed ? 'crossed-text' : 'text-style'
                          }
                        >
                          {el.text}
                        </p>
                      </div>
                      <div>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default ListTodos;
