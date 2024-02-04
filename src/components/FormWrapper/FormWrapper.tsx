import * as React from 'react';

import Paper, { PaperProps } from '@mui/material/Paper';

import * as classNames from 'classnames/bind';
import style from './FormWrapper.module.scss';
const cx = classNames.bind(style);

export interface FormWrapperProps extends PaperProps {
  children: React.ReactNode;
}

const FormWrapper = (props: FormWrapperProps) => {
  const { children, ...other } = props;

  return (
    <Paper elevation={0} className={cx('root')} sx={{ borderRadius: '8px' }} {...other}>
      {children}
    </Paper>
  );
};

FormWrapper.displayName = 'FormWrapper';

export default FormWrapper;
