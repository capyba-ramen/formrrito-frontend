import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Dialog from '@mui/material/Dialog';
import LogoSm from '@/assets/images/logo-sm.svg';
import SignIn from './SignIn';
import SignUp from './SignUp';

import * as classNames from 'classnames/bind';
import style from './AuthDialog.module.scss';
const cx = classNames.bind(style);

export interface AuthDialogProps {
  /**
   * Whether the dialog is open or not
   * @default false
   */
  open: boolean;
  /**
   * Callback fired when the dialog is closed
   */
  onClose?: () => void;
}

export type AuthDialogMode = 'signIn' | 'signUp';

const AuthDialog = (props: AuthDialogProps) => {
  const { open, onClose } = props;
  const [mode, setMode] = React.useState('signIn');

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const { reset } = methods;

  const handleContentModeChange = (mode: AuthDialogMode) => {
    reset();
    setMode(mode);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          padding: '40px 24px',
        },
        component: 'form',
      }}
      scroll="body"
    >
      <FormProvider {...methods}>
        {mode === 'signIn' ? (
          <SignIn onAuthDialogModeChange={handleContentModeChange} />
        ) : (
          <SignUp onAuthDialogModeChange={handleContentModeChange} />
        )}
        <div className={cx('logo')}>
          <img height="44" src={LogoSm} alt="logo" />
        </div>
      </FormProvider>
    </Dialog>
  );
};

AuthDialog.displayName = 'AuthDialog';

export default AuthDialog;
