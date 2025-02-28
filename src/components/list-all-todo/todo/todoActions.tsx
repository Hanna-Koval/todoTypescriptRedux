import { IconButton, Tooltip } from '@mui/material';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { maxHeight } from './styleMui';

interface PropsForButtonCancel {
  handleCancel: () => void;
}

interface PropsForButtonEdit {
  handleIsEdit: () => void;
  completed: boolean;
}

interface PropsForButtonDelete {
  handleDelete: () => void;
}

export const CancelButton = ({ handleCancel }: PropsForButtonCancel) => {
  return (
    <Tooltip title="Cancel editing" arrow>
      <IconButton onClick={handleCancel}>
        <SettingsBackupRestoreIcon />
      </IconButton>
    </Tooltip>
  );
};

export const EditButton = ({ handleIsEdit, completed }: PropsForButtonEdit) => {
  return (
    <Tooltip title="Edit" arrow>
      <IconButton onClick={handleIsEdit} disabled={completed} sx={maxHeight}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export const DeleteButton = ({ handleDelete }: PropsForButtonDelete) => {
  return (
    <Tooltip title="Delete" arrow>
      <IconButton onClick={handleDelete} sx={maxHeight}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};
