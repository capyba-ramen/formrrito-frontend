import * as React from 'react';
import { UserInfo } from '@/types/user';
import { InfoDialogProps } from '@/components/InfoDialog/InfoDialog';

export interface AuthContextProps {
  loggedInUser: UserInfo | null;
  setLoggedInUser: (user: UserInfo | null) => void;
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
