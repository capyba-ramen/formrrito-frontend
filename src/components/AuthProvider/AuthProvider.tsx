import * as React from 'react';
import AuthDialog from '../AuthDialog/AuthDialog';
import useUserInfo, { User } from '../../api/hooks/useUserInfo';

interface AuthContextProps {
  loggedInUser: User | null;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
}

export const AuthContext = React.createContext<AuthContextProps>({
  loggedInUser: null,
  openAuthDialog: () => {},
  closeAuthDialog: () => {},
});

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
    if (!loggedInUser) return;

    setShowAuthDialog(false);
  };

  const contextValue: AuthContextProps = React.useMemo(
    () => ({
      loggedInUser,
      openAuthDialog,
      closeAuthDialog,
    }),
    [loggedInUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      <AuthDialog open={showAuthDialog} onClose={closeAuthDialog} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
