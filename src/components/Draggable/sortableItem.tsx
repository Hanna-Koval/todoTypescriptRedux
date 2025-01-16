import TodoEl from '../todo/todo';
import { Todo } from '../../store';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grid, IconButton } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface PropsDraggable {
  el: Todo;
}

const SortableItem = ({ el }: PropsDraggable) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: el.id,
      transition: {
        duration: 200, // milliseconds
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  };

  return (
    <div style={style} ref={setNodeRef}>
      <Grid container alignItems="center">
        <Grid item xs={11}>
          <TodoEl el={el} />
        </Grid>
        <Grid item xs={1}>
          <IconButton {...attributes} {...listeners}>
            <DragIndicatorIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default SortableItem;
