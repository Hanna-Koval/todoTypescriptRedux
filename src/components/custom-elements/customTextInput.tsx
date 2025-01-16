import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { styleFormControl, styleInput, styleLabel } from '../stylesMui';
import CloseIcon from '@mui/icons-material/Close';

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

const StyledTextInput = React.forwardRef<HTMLDivElement, PropsStyledInput>(
  (props, ref) => {
    const { label, value, id, onChange, onSave, onCancel, focused, multiline } =
      props;
    return (
      <>
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
            onFocus={function (e) {
              let val = e.target.value;
              e.target.value = '';
              e.target.value = val;
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onChange(event.target.value);
            }}
            size="small"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Escape' && onCancel) {
                onCancel();
              } else if (e.key === 'Enter' && value?.trim() && onSave) {
                onSave();
              }
            }}
            fullWidth
            endAdornment={
              onSave && value ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() => {
                      if (value?.trim()) {
                        onSave();
                      }
                    }}
                  >
                    <CheckIcon />
                  </IconButton>
                </InputAdornment>
              ) : value !== '' ? (
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={() => onChange('')}
                >
                  <CloseIcon />
                </IconButton>
              ) : null
            }
          />
        </FormControl>
      </>
    );
  }
);
export default StyledTextInput;
