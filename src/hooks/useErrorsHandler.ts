import * as React from 'react';
import useNotification from '../components/NotificationProvider/useNotification';
import useAuth from '../components/AuthProvider/useAuth';

export default function useErrorsHandler() {
  const { addNotification } = useNotification();
  const { openAuthDialog } = useAuth();

  const errorsHandler = React.useCallback((error) => {
    if (error?.response?.status === 401) {
      openAuthDialog();
      return;
    }

    addNotification({
      message: 'Please try again later',
    });
  }, []);

  return { errorsHandler };
}
