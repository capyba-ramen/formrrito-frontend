import * as React from 'react';
import DialogContext, { DialogContextProps } from './DialogContext';
import InfoDialog, { InfoDialogProps } from '@/components/InfoDialog/InfoDialog';

interface DialogProviderProps {
  children: React.ReactNode;
}

const DialogProvider = (props: DialogProviderProps) => {
  const { children } = props;
  const [dialogProps, setDialogProps] = React.useState<InfoDialogProps>({
    open: false,
    title: '',
    content: '',
    confirmBtnText: '',
    cancelBtnText: '',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const openDialog = React.useCallback((dialogProps: Omit<InfoDialogProps, 'open'>) => {
    setDialogProps({
      open: true,
      ...dialogProps,
    });
  }, []);

  const closeDialog = React.useCallback(() => {
    setDialogProps({ open: false });
  }, []);

  const contextValue: DialogContextProps = React.useMemo(
    () => ({
      openDialog,
      closeDialog,
    }),
    [openDialog, closeDialog]
  );

  const handleClose = () => {
    dialogProps.onClose?.();
    closeDialog();
  };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      <InfoDialog onClose={handleClose} {...dialogProps} />
    </DialogContext.Provider>
  );
};

export default DialogProvider;
