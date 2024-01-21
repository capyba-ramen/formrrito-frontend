import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface InfoDialogProps {
  /**
   * Whether the dialog is open or not
   * @default false
   */
  open: boolean;
  title?: string;
  content?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const InfoDialog = (props: InfoDialogProps) => {
  const { open, title, content, confirmBtnText, cancelBtnText, onConfirm, onCancel } = props;

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          padding: '24px 16px',
        },
      }}
      scroll="body"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {cancelBtnText && <Button onClick={onCancel}>{cancelBtnText}</Button>}
        <Button onClick={onConfirm}>{confirmBtnText}</Button>
      </DialogActions>
    </Dialog>
  );
};

InfoDialog.displayName = ' InfoDialog';

export default InfoDialog;
