import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconButton, Tooltip } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Todo } from '../../store/reducer';
import TodoEl from '../todo';
import { useMemo } from 'react';
import { transitionObj } from './uitls';

interface PropsDraggable {
  el: Todo;
}

const SortableItem = ({ el }: PropsDraggable) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: el.id,
      transition: transitionObj,
    });
  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 10,
      width: '100%',
    }),
    [transform, transition]
  );

  return (
    <div style={style} ref={setNodeRef}>
      <TodoEl el={el} />
      <Tooltip title="Change order" arrow>
        <IconButton {...attributes} {...listeners}>
          <DragIndicatorIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default SortableItem;
