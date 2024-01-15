import * as React from 'react';

import AuthContext from './AuthContext';

const useAuth = () => {
  const { loggedInUser, setLoggedInUser, openAuthDialog, closeAuthDialog } = React.useContext(AuthContext);

  return {
    loggedInUser,
    setLoggedInUser,
    openAuthDialog,
    closeAuthDialog,
  };
};

export default useAuth;
