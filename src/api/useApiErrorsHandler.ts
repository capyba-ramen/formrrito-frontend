import * as React from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import useNotification from '../components/NotificationProvider/useNotification';

export default function useApiErrorHandlers() {
  const { addNotification, openDialog } = useNotification();
  const navigate = useNavigate();

  const errorsHandler = React.useCallback((error: AxiosError) => {
    if (error?.response?.status === 403) {
      openDialog({
        title: 'Access Denied',
        content: "Oops! It seems you don't have the necessary permissions to access this page.",
        onConfirm: () => {
          window.location.href = '/forms';
        },
        confirmBtnText: 'Go To Homepage',
        isCloseableByOutside: false,
      });
      return;
    }

    if (error?.response?.status === 404) {
      openDialog({
        title: 'Cannot Find',
        content: 'Oops! It seems something went wrong. Please try again later.',
        onConfirm: () => {
          navigate(-1);
        },
        confirmBtnText: 'Go Back',
        isCloseableByOutside: false,
      });
      return;
    }

    addNotification({
      message: 'Please try again later',
    });
  }, []);

  return { errorsHandler };
}
