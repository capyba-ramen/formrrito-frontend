import * as React from 'react';
import AuthDialog from '@/components/AuthDialog/AuthDialog';
import InfoDialog, { InfoDialogProps } from '@/components/InfoDialog/InfoDialog';
import useUserInfoRequest from '@/api/user/useUserInfoRequest';
import AuthContext, { AuthContextProps } from './AuthContext';
import { UserInfo } from '@/types/user';

interface AuthProviderProps {
  children: React.ReactNode;
  type?: 'business' | 'consumer';
}

const AuthProvider = (props: AuthProviderProps) => {
  const { children, type = 'business' } = props;
  const [loggedInUser, setLoggedInUser] = React.useState<UserInfo | null>(null);
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
  const { data: user, error } = useUserInfoRequest(type === 'business');

  React.useEffect(() => {
    if (type === 'consumer') return;
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
