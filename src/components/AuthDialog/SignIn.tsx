import { useFormContext } from 'react-hook-form';

import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import Password from '../UserFormFields/Password/Password';
import Email from '../UserFormFields/Email/Email';
import useAuth from '../AuthProvider/useAuth';
import useSignIn from '@/api/user/useSignIn';
import { AuthDialogMode } from './AuthDialog';
import useNotification from '@/components/NotificationProvider/useNotification';

export interface SignInProps {
  onAuthDialogModeChange: (mode: AuthDialogMode) => void;
}

const SignIn = (props: SignInProps) => {
  const { onAuthDialogModeChange } = props;
  const { closeAuthDialog } = useAuth();
  const { handleSubmit } = useFormContext();
  const { trigger: postSignIn } = useSignIn();
  const { addNotification } = useNotification();

  const handleSignIn = handleSubmit((data) => {
    postSignIn({
      email: data.email,
      password: data.password,
    })
      .then(() => {
        closeAuthDialog();
        location.reload();
      })
      .catch((err) => {
        addNotification({
          message: err.response.data?.detail,
        });
      });
  });

  const handleSignUpClick = () => {
    onAuthDialogModeChange('signUp');
  };

  return (
    <>
      <DialogTitle align="center">Login to your account</DialogTitle>
      <DialogContentText sx={{ color: 'var(--gray-3)' }} align="center">
        Wrap up your ideas with Formrrito! Login to start rolling out your custom forms today!
      </DialogContentText>
      <DialogContent sx={{ padding: '24px 24px 0' }}>
        <Email />
        <Password />
        <div style={{ padding: '24px 0' }}>
          <Button type="submit" variant="contained" size="large" fullWidth onClick={handleSignIn}>
            Sign in
          </Button>
          <Typography align="center" sx={{ margin: '16px 0' }}>
            or
          </Typography>
          <Button variant="outlined" size="large" fullWidth onClick={handleSignUpClick}>
            Register
          </Button>
        </div>
      </DialogContent>
    </>
  );
};

SignIn.displayName = 'SignIn';

export default SignIn;
