import * as React from 'react';
import AuthDialog from '../AuthDialog/AuthDialog';
import useUserInfo, { User } from '../../api/hooks/useUserInfo';
import AuthContext, { AuthContextProps } from './AuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [loggedInUser, setLoggedInUser] = React.useState<User | null>(null);
  const [showAuthDialog, setShowAuthDialog] = React.useState(false);
  const { user, error } = useUserInfo();

  React.useEffect(() => {
    if (error?.response?.status === 401) {
      setShowAuthDialog(true);
    }

    if (user?.username) {
      setLoggedInUser({ name: user?.username });
    }
  }, [error, user]);

  const openAuthDialog = () => {
    setShowAuthDialog(true);
  };

  const closeAuthDialog = () => {
    setShowAuthDialog(false);
  };

  const contextValue: AuthContextProps = React.useMemo(
    () => ({
      loggedInUser,
      setLoggedInUser,
      openAuthDialog,
      closeAuthDialog,
    }),
    [loggedInUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      <AuthDialog open={showAuthDialog} onClose={loggedInUser ? closeAuthDialog : undefined} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
