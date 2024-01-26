import * as React from 'react';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';

import { Question } from '@/types/question';
import { QuestionTypeEnum } from '@/constants/question';

export interface FormFieldProps {
  type: Question['type'];
  value: any;
  onChange: (e: React.ChangeEvent | SelectChangeEvent) => void;
  options?: Question['options'];
  required?: Question['is_required'];
  error?: boolean;
  helperText?: string;
}

const FormField = React.forwardRef((props: FormFieldProps, ref) => {
  const { type, options, value, onChange, error, required, helperText } = props;

  switch (type) {
    case QuestionTypeEnum.SIMPLE:
      return (
        <TextField
          value={value}
          onChange={onChange}
          variant="standard"
          fullWidth
          ref={ref}
          helperText={helperText}
          error={error}
          required={required}
        />
      );
    case QuestionTypeEnum.COMPLEX:
      return (
        <TextField
          value={value}
          onChange={onChange}
          multiline
          variant="standard"
          fullWidth
          ref={ref}
          helperText={helperText}
          error={error}
          required={required}
        />
      );
    case QuestionTypeEnum.SINGLE:
      return (
        <FormControl error={error} required={required}>
          <RadioGroup value={value} onChange={onChange} ref={ref}>
            {options?.map((option) => (
              <FormControlLabel key={option.id} value={option.id} control={<Radio />} label={option.title} />
            ))}
          </RadioGroup>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      );
    case QuestionTypeEnum.MULTIPLE:
      return (
        <FormControl component="fieldset" variant="standard" error={error} required={required}>
          <FormGroup>
            {options?.map((option) => (
              <FormControlLabel
                key={option.id}
                control={
                  <Checkbox name={option.id} onChange={onChange} checked={value?.options?.includes(option.id)} />
                }
                label={option.title}
              />
            ))}
          </FormGroup>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      );
    case QuestionTypeEnum.DROP_DOWN:
      return (
        <FormControl variant="standard" fullWidth error={error} required={required}>
          <Select ref={ref} value={value} onChange={onChange}>
            {options?.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.title}
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      );
  }
});

FormField.displayName = 'FormField';

export default FormField;
