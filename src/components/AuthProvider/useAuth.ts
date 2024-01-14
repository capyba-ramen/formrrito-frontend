import * as React from 'react';

import { AuthContext } from './AuthProvider';

const useAuth = () => {
  const { loggedInUser, showAuthDialog, openAuthDialog, closeAuthDialog, handleLogin, handleRegister } =
    React.useContext(AuthContext);

  return {
    loggedInUser,
    showAuthDialog,
    openAuthDialog,
    closeAuthDialog,
    handleLogin,
    handleRegister,
  };
};

export default useAuth;
