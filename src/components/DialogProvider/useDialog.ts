import * as React from 'react';
import DialogContext from './DialogContext';

const useDialog = () => {
  const { openDialog, closeDialog } = React.useContext(DialogContext);

  return {
    openDialog,
    closeDialog,
  };
};

export default useDialog;
