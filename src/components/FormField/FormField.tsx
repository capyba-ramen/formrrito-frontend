import * as React from 'react';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';

import { Question } from '@/types/question';
import { QuestionTypeEnum } from '@/constants/question';

export interface FormFieldProps {
  type: Question['type'];
  options: Question['options'];
  title: Question['title'];
  description: Question['description'];
  is_required: Question['is_required'];
  index: number;
  error: any;
  value: any;
  onChange: any;
}

const FormField = React.forwardRef((props: FormFieldProps, ref) => {
  const { type, options, value, onChange, error } = props;

  switch (type) {
    case QuestionTypeEnum.SIMPLE:
      return (
        <TextField
          value={value?.answer}
          onChange={(e) => {
            onChange({
              ...value,
              answer: e.target.value,
            });
          }}
          variant="standard"
          fullWidth
          ref={ref}
          helperText={error?.message}
          error={!!error?.type}
        />
      );
    case QuestionTypeEnum.COMPLEX:
      return (
        <TextField
          value={value?.answer}
          onChange={(e) => {
            onChange({
              ...value,
              answer: e.target.value,
            });
          }}
          multiline
          variant="standard"
          fullWidth
          ref={ref}
          helperText={error?.message}
          error={!!error?.type}
        />
      );
    case QuestionTypeEnum.SINGLE:
      return (
        <FormControl error={!!error?.type}>
          <RadioGroup
            value={value}
            onChange={(e) => {
              onChange({
                ...value,
                option_id: e.target.value,
                option_title: options?.find((option) => option.id === e.target.value)?.title,
              });
            }}
            ref={ref}
          >
            {options?.map((option) => (
              <FormControlLabel key={option.id} value={option.id} control={<Radio />} label={option.title} />
            ))}
          </RadioGroup>
          {error?.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      );
    case QuestionTypeEnum.MULTIPLE:
      return (
        <FormControl component="fieldset" variant="standard" error={!!error?.type}>
          <FormGroup>
            {options?.map((option) => (
              <FormControlLabel
                key={option.id}
                control={
                  <Checkbox
                    name={option.id}
                    onChange={(e) => {
                      onChange({
                        ...value,
                        // TOFIX: option_id should be array
                        option_id: e.target.value,
                        option_title: options?.find((option) => option.id === e.target.value)?.title,
                      });
                    }}
                    checked={value?.option_id?.includes(option.id)}
                  />
                }
                label={option.title}
              />
            ))}
          </FormGroup>
          {error?.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      );
    case QuestionTypeEnum.DROP_DOWN:
      return (
        <FormControl variant="standard" fullWidth error={!!error?.type}>
          <Select
            ref={ref}
            value={value?.option_id}
            onChange={(e) => {
              onChange({
                ...value,
                option_id: e.target.value,
                option_title: options?.find((option) => option.id === e.target.value)?.title,
              });
            }}
          >
            {options?.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.title}
              </MenuItem>
            ))}
          </Select>
          {error?.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      );
  }
});

FormField.displayName = 'FormField';

export default FormField;
