import * as React from 'react';
import AuthDialog from '@/components/AuthDialog/AuthDialog';
import InfoDialog, { InfoDialogProps } from '@/components/InfoDialog/InfoDialog';
import useUserInfoRequest, { User } from '@/api/user/useUserInfoRequest';
import AuthContext, { AuthContextProps } from './AuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [loggedInUser, setLoggedInUser] = React.useState<User | null>(null);
  const [showAuthDialog, setShowAuthDialog] = React.useState(false);
  const [infoDialogProps, setInfoDialogProps] = React.useState<InfoDialogProps>({
    open: false,
    title: '',
    content: '',
    confirmBtnText: '',
    cancelBtnText: '',
    onConfirm: () => {},
    onCancel: () => {},
  });
  const { user, error } = useUserInfoRequest();

  React.useEffect(() => {
    if (error?.response?.status === 401) {
      openAuthDialog();
    }

    if (user?.username) {
      setLoggedInUser({ name: user?.username });
    }
  }, [error, user]);

  const openAuthDialog = () => {
    setShowAuthDialog(true);
  };

  const openInfoDialog = (dialogProps: Omit<InfoDialogProps, 'open'>) => {
    setInfoDialogProps({
      open: true,
      ...dialogProps,
    });
  };

  const closeAuthDialog = () => {
    setShowAuthDialog(false);
  };

  const closeInfoDialog = () => {
    setInfoDialogProps({ open: false });
  };

  const contextValue: AuthContextProps = React.useMemo(
    () => ({
      loggedInUser,
      setLoggedInUser,
      openAuthDialog,
      closeAuthDialog,
      openInfoDialog,
      closeInfoDialog,
    }),
    [loggedInUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      <AuthDialog open={showAuthDialog} onClose={loggedInUser ? closeAuthDialog : undefined} />
      <InfoDialog {...infoDialogProps} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
