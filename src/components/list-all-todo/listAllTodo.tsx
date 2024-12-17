import { useDispatch, useSelector } from 'react-redux';
import { RootState, Todo, todoActions } from '../../store';

import './listAllTodo.scss';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React, { Fragment } from 'react';
import SortableItem from '../Draggable/sortableItem';

const ListTodos = () => {
  const dispatch = useDispatch();
  const allTodo = useSelector((state: RootState) =>
    state.todos
      .slice()
      .sort(
        (el1: Todo, el2: Todo) =>
          +el1.completed - +el2.completed || +el2.important - +el1.important
      )
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      dispatch(
        todoActions.swapeItems({ activeId: active.id, overId: over.id })
      );
    }
  };
  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={allTodo} strategy={verticalListSortingStrategy}>
          <>
            {allTodo.map((el: Todo) => {
              return (
                <Fragment key={el.id}>
                  <SortableItem el={el} />
                </Fragment>
              );
            })}
          </>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default ListTodos;
