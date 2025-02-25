import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, InputAdornment } from '@mui/material';

export const EndIconCheckIcon = (handleClickOnButton: () => void) => {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        edge="end"
        onClick={handleClickOnButton}
      >
        <CheckIcon />
      </IconButton>
    </InputAdornment>
  );
};

export const EndIconCloseIcon = (onChange: (str: string) => void) => {
  return (
    <IconButton
      aria-label="toggle password visibility"
      edge="end"
      onClick={() => onChange('')}
    >
      <CloseIcon />
    </IconButton>
  );
};
