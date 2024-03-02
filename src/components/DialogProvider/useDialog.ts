import * as React from 'react';
import DialogContext from './DialogContext';

const useDialog = (key: string) => {
  const { openDialog, closeDialog } = React.useContext(DialogContext);

  const handleOpenDialog = React.useCallback(
    ({ component, dialogProps }: { component?: React.FC<any>; dialogProps?: any }) => {
      openDialog(key, { component, dialogProps });
    },
    [key, openDialog]
  );

  const handleCloseDialog = React.useCallback(() => {
    closeDialog(key);
  }, [key, closeDialog]);

  return {
    openDialog: handleOpenDialog,
    closeDialog: handleCloseDialog,
  };
};

export default useDialog;
