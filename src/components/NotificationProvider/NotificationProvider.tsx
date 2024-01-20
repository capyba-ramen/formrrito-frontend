import * as React from 'react';
import NotificationContext, { NotificationContextProps } from './NotificationContext';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import useTimeout from '@/hooks/useTimeout';

interface NotificationProviderProps {
  children: React.ReactNode;
}

const NotificationProvider = (props: NotificationProviderProps) => {
  const { children } = props;
  const [notifications, setNotifications] = React.useState<SnackbarProps[]>([]);

  const addNotification = React.useCallback(
    (notification: SnackbarProps) => {
      setNotifications((notifications) => [...notifications, notification]);
    },
    [setNotifications]
  );

  const removeNotification = React.useCallback(() => {
    setNotifications((array) => {
      const [, ...rest] = array;
      return rest;
    });
  }, [setNotifications]);

  const [, clear, set] = useTimeout(removeNotification, 3000);

  React.useEffect(() => {
    if (notifications.length > 0) {
      set();
    }

    return () => {
      clear();
    };
  }, [notifications, set]);

  const contextValue: NotificationContextProps = React.useMemo(
    () => ({
      notifications,
      addNotification,
    }),
    [addNotification, notifications]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {notifications.map((props, idx) => (
        <Snackbar
          key={`snackbar-${idx}`}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open
          onClose={removeNotification}
          message={props.message}
          {...props}
        />
      ))}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
