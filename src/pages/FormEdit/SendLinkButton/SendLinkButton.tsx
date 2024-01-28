import * as React from 'react';

import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import SendLinkDialog from './SendLinkDialog';

const SendLinkButton = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  const openShortUrlDialog = React.useCallback(() => {
    setShowDialog(true);
  }, []);

  const closeShortUrlDialog = React.useCallback(() => {
    setShowDialog(false);
  }, []);

  return (
    <>
      <Button variant="outlined" startIcon={<ShareIcon />} size="large" onClick={openShortUrlDialog}>
        Send
      </Button>
      <SendLinkDialog open={showDialog} onClose={closeShortUrlDialog} />
    </>
  );
};

SendLinkButton.displayName = 'SendLinkButton';

export default SendLinkButton;
