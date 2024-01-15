import * as React from 'react';
import { SnackbarProps } from '@mui/material/Snackbar';

export interface NotificationContextProps {
  notifications: SnackbarProps[];
  addNotification: (notification: SnackbarProps) => void;
}

const NotificationContext = React.createContext<NotificationContextProps>({
  notifications: [],
  addNotification: () => {},
});

export default NotificationContext;
