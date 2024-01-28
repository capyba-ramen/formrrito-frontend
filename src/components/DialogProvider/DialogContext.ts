import * as React from 'react';
import { InfoDialogProps } from '@/components/InfoDialog/InfoDialog';

export interface DialogContextProps {
  openDialog: (dialogProps: Omit<InfoDialogProps, 'open'>) => void;
  closeDialog: () => void;
}

const DialogContext = React.createContext<DialogContextProps>({
  openDialog: () => {},
  closeDialog: () => {},
});

export default DialogContext;
