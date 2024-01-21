import * as React from 'react';

import AuthContext from './AuthContext';

const useAuth = () => {
  const { loggedInUser, setLoggedInUser, openAuthDialog, closeAuthDialog, openInfoDialog, closeInfoDialog } =
    React.useContext(AuthContext);

  return {
    loggedInUser,
    setLoggedInUser,
    openAuthDialog,
    closeAuthDialog,
    openInfoDialog,
    closeInfoDialog,
  };
};

export default useAuth;
