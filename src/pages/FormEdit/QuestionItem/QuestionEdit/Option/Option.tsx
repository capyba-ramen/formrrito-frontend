import * as React from 'react';
import { Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import * as classNames from 'classnames/bind';
import style from './Option.module.scss';
const cx = classNames.bind(style);

export interface OptionProps {
  prefix: React.ReactNode;
  name: string;
  onRemove: () => void;
}

const Option = (props: OptionProps) => {
  const { prefix, name, onRemove } = props;

  return (
    <div className={cx('root')}>
      {prefix}
      <Controller
        name={name}
        rules={{
          maxLength: {
            value: 50,
            message: 'Maximum 50 characters',
          },
        }}
        render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
          <TextField
            value={value}
            variant="standard"
            onChange={onChange}
            error={!!error?.type}
            helperText={error?.message}
            ref={ref}
            sx={{ maxWidth: '100%', width: '300px' }}
          />
        )}
      />
      <IconButton aria-label="delete" color="primary" onClick={onRemove}>
        <CloseIcon />
      </IconButton>
    </div>
  );
};

Option.displayName = 'Option';

export default Option;
