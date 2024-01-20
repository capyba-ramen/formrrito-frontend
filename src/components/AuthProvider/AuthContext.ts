import * as React from 'react';
import { User } from '@/api/user/useUserInfoRequest';

export interface AuthContextProps {
  loggedInUser: User | null;
  setLoggedInUser: (user: User | null) => void;
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
