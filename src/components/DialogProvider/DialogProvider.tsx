import * as React from 'react';
import DialogContext, { DialogContextProps } from './DialogContext';
import InfoDialog from '@/components/InfoDialog/InfoDialog';
import { DialogTypes } from '@/constants/dialogs';

interface DialogProviderProps {
  children: React.ReactNode;
}

interface DialogState {
  [key: string]: {
    component: React.FC | undefined;
    dialogProps: any;
  };
}

const DialogProvider = (props: DialogProviderProps) => {
  const { children } = props;
  const dialogsRef = React.useRef<DialogState>({});
  const [dialogs, setDialogs] = React.useState<DialogState>({});

  const openDialog = React.useCallback(
    (
      key: string,
      {
        component,
        dialogProps,
      }: {
        component?: React.FC;
        dialogProps?: any;
      }
    ) => {
      dialogsRef.current[key] = {
        component,
        dialogProps: {
          ...dialogProps,
          open: true,
        },
      };

      setDialogs({ ...dialogsRef.current });
    },
    []
  );

  const closeDialog = React.useCallback((key: string) => {
    dialogsRef.current[key] = {
      ...dialogsRef.current[key],
      dialogProps: {
        ...dialogsRef.current[key].dialogProps,
        open: false,
      },
    };

    setDialogs({ ...dialogsRef.current });
  }, []);

  const contextValue: DialogContextProps = React.useMemo(
    () => ({
      openDialog,
      closeDialog,
    }),
    [openDialog, closeDialog]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      {Object.entries(dialogs).map(([key, { component: Component, dialogProps }]) => {
        if (key === DialogTypes.INFO_DIALOG) {
          return <InfoDialog open={dialogProps.open} onClose={() => closeDialog(key)} key={key} {...dialogProps} />;
        }
        if (!Component) return undefined;
        return <Component open={dialogProps.open} key={key} onClose={() => closeDialog(key)} {...dialogProps} />;
      })}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
