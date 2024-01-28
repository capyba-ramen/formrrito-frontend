import * as React from 'react';
import { useParams } from 'react-router-dom';

import useNotification from '@/components/NotificationProvider/useNotification';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import useCreateShortenedUrl from '@/api/tool/useCreateShortenedUrl';
import InfoDialog from '@/components/InfoDialog/InfoDialog';

import * as classNames from 'classnames/bind';
import style from './SendLinkDialog.module.scss';
const cx = classNames.bind(style);

const SendLinkDialog = (props) => {
  const { open, onClose } = props;
  const { formId } = useParams();
  const { addNotification } = useNotification();
  const linkPrefix = import.meta.env.VITE_PUBLIC_PATH;

  const [shortenedUrl, setShortenedUrl] = React.useState('');
  const [isShortened, setIsShortened] = React.useState(false);
  const { trigger: createShortenedUrl } = useCreateShortenedUrl();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsShortened(e.target.checked);

    if (e.target.checked && !shortenedUrl) {
      createShortenedUrl({
        url: `/c-form/${formId}`,
      }).then((res) => {
        setShortenedUrl(`/u/${res.data}`);
      });
    }
  };

  const handleConfirm = () => {
    navigator.clipboard
      .writeText(linkPrefix + (isShortened ? shortenedUrl : `/c-form/${formId}`))
      .then(() => {
        addNotification({
          message: 'Copied to clipboard',
        });
      })
      .catch(() => {
        addNotification({
          message: 'Unable to copy text to clipboard',
        });
      });
  };
  return (
    <InfoDialog
      open={open}
      onClose={onClose}
      title="Send Form"
      content="Copy the link below and send it to your friends. They'll be able to fill out your form."
      onConfirm={handleConfirm}
      confirmBtnText="Copy"
    >
      <div className={cx('link')}>
        <Typography variant="subtitle1" fontWeight={600}>
          Link
        </Typography>
        <TextField
          value={linkPrefix + (isShortened ? shortenedUrl : `/c-form/${formId}`)}
          fullWidth
          variant="standard"
        />
        <FormControlLabel
          control={<Checkbox name="shortened-url" onChange={handleChange} checked={isShortened} />}
          label="Shorten URL"
        />
      </div>
    </InfoDialog>
  );
};

SendLinkDialog.displayName = 'SendLinkDialog';

export default SendLinkDialog;
