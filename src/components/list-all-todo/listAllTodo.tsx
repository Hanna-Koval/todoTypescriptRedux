import { useDispatch, useSelector } from 'react-redux';
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
import { Todo, todoActions } from '../store/reducer';
import { selectors } from '../store';
import SortableItem from './draggable';

const AllTodoList = () => {
  const dispatch = useDispatch();
  const allTodo = useSelector(selectors.selectAllTodo);
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
        todoActions.swopeItems({ activeId: active.id, overId: over.id })
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

export default AllTodoList;
