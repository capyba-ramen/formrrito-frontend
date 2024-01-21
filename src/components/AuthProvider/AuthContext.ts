import * as React from 'react';
import { User } from '@/api/user/useUserInfoRequest';
import { InfoDialogProps } from '@/components/InfoDialog/InfoDialog';

export interface AuthContextProps {
  loggedInUser: User | null;
  setLoggedInUser: (user: User | null) => void;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
  openInfoDialog: (dialogProps: Omit<InfoDialogProps, 'open'>) => void;
  closeInfoDialog: () => void;
}

const AuthContext = React.createContext<AuthContextProps>({
  loggedInUser: null,
  setLoggedInUser: () => {},
  openAuthDialog: () => {},
  closeAuthDialog: () => {},
  openInfoDialog: () => {},
  closeInfoDialog: () => {},
});

export default AuthContext;
