import { useFormContext } from 'react-hook-form';

import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import Password from '../UserFormFields/Password/Password';
import Email from '../UserFormFields/Email/Email';
import Username from '../UserFormFields/Username/Username';
import { AuthDialogMode } from './AuthDialog';
import useSignUp from '@/api/user/useSignUp';
import useNotification from '../NotificationProvider/useNotification';

export interface SignUpProps {
  onAuthDialogModeChange: (mode: AuthDialogMode) => void;
}

const SignUp = (props: SignUpProps) => {
  const { onAuthDialogModeChange } = props;
  const { handleSubmit, setError } = useFormContext();
  const { trigger: postSignUp } = useSignUp();
  const { addNotification } = useNotification();

  const handleSignUp = handleSubmit((data) => {
    postSignUp({
      email: data.email,
      password: data.password,
      username: data.username,
    })
      .then(() => {
        addNotification({
          message: 'Account created successfully! Please login to continue.',
        });
        onAuthDialogModeChange('signIn');
      })
      .catch((err) => {
        console.log(err);

        if (err.response.status === 400) {
          setError('email', {
            type: 'server',
            message: 'Email already exists',
          });
        }
      });
  });

  const handleSignInClick = () => {
    onAuthDialogModeChange('signIn');
  };

  return (
    <>
      <DialogTitle align="center">Signup with Formrrito!</DialogTitle>
      <DialogContentText sx={{ color: 'var(--gray-3)' }} align="center">
        Wrap up your ideas with Formrrito! Signup to start rolling out your custom forms today!
      </DialogContentText>
      <DialogContent sx={{ padding: '24px 24px 0' }}>
        <Username />
        <Email />
        <Password />
        <div style={{ padding: '24px 0' }}>
          <Button variant="contained" size="large" type="submit" fullWidth onClick={handleSignUp}>
            Register
          </Button>
          <Typography align="center" sx={{ margin: '16px 0' }}>
            or
          </Typography>
          <Button variant="outlined" size="large" fullWidth onClick={handleSignInClick}>
            Sign in
          </Button>
        </div>
      </DialogContent>
    </>
  );
};

SignUp.displayName = 'SignUp';

export default SignUp;
