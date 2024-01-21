import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import useNotification from '../components/NotificationProvider/useNotification';
import useAuth from '../components/AuthProvider/useAuth';

export default function useErrorsHandler() {
  const { addNotification } = useNotification();
  const { openInfoDialog } = useAuth();
  const navigate = useNavigate();

  const errorsHandler = React.useCallback((error) => {
    if (error?.response?.status === 403) {
      openInfoDialog({
        title: 'Access Denied',
        content: "Oops! It seems you don't have the necessary permissions to access this page.",
        onConfirm: () => {
          window.location.href = '/forms';
        },
        confirmBtnText: 'Go To Homepage',
      });
      return;
    }

    if (error?.response?.status === 404) {
      openInfoDialog({
        title: 'Cannot Find',
        content: 'Oops! It seems something went wrong. Please try again later.',
        onConfirm: () => {
          navigate(-1);
        },
        confirmBtnText: 'Go Back',
      });
      return;
    }

    addNotification({
      message: 'Please try again later',
    });
  }, []);

  return { errorsHandler };
}
