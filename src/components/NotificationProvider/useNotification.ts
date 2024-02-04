import * as React from 'react';
import NotificationContext from './NotificationContext';

const useNotification = () => {
  const { addNotification } = React.useContext(NotificationContext);

  return {
    addNotification,
  };
};

export default useNotification;
