import * as React from 'react';
import NotificationContext from './NotificationContext';

const useNotification = () => {
  const { addNotification, openDialog, closeDialog } = React.useContext(NotificationContext);

  return {
    addNotification,
    openDialog,
    closeDialog,
  };
};

export default useNotification;
