import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import SendLinkDialog from './SendLinkDialog';
import useDialog from '@/components/DialogProvider/useDialog';

const SendLinkButton = () => {
  const { openDialog } = useDialog('SendLinkDialog');

  const openShortUrlDialog = () => {
    openDialog({ component: SendLinkDialog });
  };

  return (
    <Button variant="outlined" startIcon={<ShareIcon />} size="large" onClick={openShortUrlDialog}>
      Send
    </Button>
  );
};

SendLinkButton.displayName = 'SendLinkButton';

export default SendLinkButton;
