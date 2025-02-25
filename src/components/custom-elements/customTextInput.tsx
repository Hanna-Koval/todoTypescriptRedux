import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';

import { styleFormControl, styleInput, styleLabel } from './styleMui';
import { handleFocus } from './utils';
import { EndIconCheckIcon, EndIconCloseIcon } from './endIcons';

interface PropsStyledInput {
  label?: string;
  value?: string;
  id: string;
  onChange: (str: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
  onKeyDown?: (str: string) => void;
  focused?: boolean;
  multiline?: boolean;
}

const CustomTextInput = React.forwardRef<HTMLDivElement, PropsStyledInput>(
  (props, ref) => {
    const { label, value, id, onChange, onSave, onCancel, focused, multiline } =
      props;

    const handleButtonPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape' && onCancel) {
        onCancel();
      } else if (e.key === 'Enter' && onSave) {
        if (!value?.trim()) {
          e.stopPropagation();
          e.preventDefault();
        } else {
          onSave();
        }
      }
    };
    const handleClickOnButton = () => {
      if (value?.trim() && onSave) {
        onSave();
      }
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };

    return (
      <FormControl sx={styleFormControl} variant="outlined" ref={ref}>
        <InputLabel sx={styleLabel} htmlFor="outlined-adornment-password">
          {label}
        </InputLabel>
        <OutlinedInput
          sx={styleInput}
          id={id}
          value={value}
          label={label}
          multiline={multiline}
          autoFocus={focused}
          onFocus={handleFocus}
          onChange={handleOnChange}
          size="small"
          onKeyDown={handleButtonPressed}
          fullWidth
          endAdornment={
            onSave && value
              ? EndIconCheckIcon(handleClickOnButton)
              : value !== ''
              ? EndIconCloseIcon(onChange)
              : null
          }
        />
      </FormControl>
    );
  }
);
export default CustomTextInput;
