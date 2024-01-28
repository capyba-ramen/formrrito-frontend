import * as React from 'react';

export interface DialogContextProps {
  openDialog: (
    key: string,
    {
      component,
      dialogProps,
    }: {
      component?: React.FC;
      dialogProps?: any;
    }
  ) => void;
  closeDialog: (key: string) => void;
}

const DialogContext = React.createContext<DialogContextProps>({
  openDialog: () => {},
  closeDialog: () => {},
});

export default DialogContext;
