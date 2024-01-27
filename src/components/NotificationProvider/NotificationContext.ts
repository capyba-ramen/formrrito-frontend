import * as React from 'react';
import { SnackbarProps } from '@mui/material/Snackbar';
import { InfoDialogProps } from '@/components/InfoDialog/InfoDialog';

export interface NotificationContextProps {
  notifications: SnackbarProps[];
  addNotification: (notification: SnackbarProps) => void;
  openDialog: (dialogProps: Omit<InfoDialogProps, 'open'>) => void;
  closeDialog: () => void;
}

const NotificationContext = React.createContext<NotificationContextProps>({
  notifications: [],
  addNotification: () => {},
  openDialog: () => {},
  closeDialog: () => {},
});

export default NotificationContext;
