import * as React from 'react';
import { UserInfo } from '@/types/user';

export interface AuthContextProps {
  loggedInUser: UserInfo | null;
  setLoggedInUser: (user: UserInfo | null) => void;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
}

const AuthContext = React.createContext<AuthContextProps>({
  loggedInUser: null,
  setLoggedInUser: () => {},
  openAuthDialog: () => {},
  closeAuthDialog: () => {},
});

export default AuthContext;
