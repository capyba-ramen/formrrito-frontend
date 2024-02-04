import * as React from 'react';
import { Link } from 'react-router-dom';

import Card, { CardProps } from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import useDeleteForm from '@/api/form/useDeleteForm';
import { utcToFormatUserDateTime } from '@/utils/date';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import useNotification from '@/components/NotificationProvider/useNotification';

import * as classNames from 'classnames/bind';
import style from './FormCard.module.scss';
const cx = classNames.bind(style);

export interface FormCardProps extends CardProps {
  image?: string;
  title?: string;
  openDateTime?: string;
  formId: string;
  onDelete: (formId: string) => void;
}

const FormCard = (props: FormCardProps) => {
  const { image, title, openDateTime = '', formId, onDelete, ...other } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { trigger: deleteForm } = useDeleteForm();
  const { addNotification } = useNotification();

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteForm = () => {
    deleteForm({
      formId,
    }).then(() => {
      onDelete(formId);
      addNotification({
        message: 'Form deleted successfully',
      });
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Card
        classes={{
          root: cx('root', 'card'),
        }}
        elevation={0}
        {...other}
      >
        <CardActionArea>
          <Link to={`/form/${formId}`}>
            <CardMedia component="img" height="144" image={image} alt={`img-${formId}`} />
          </Link>
        </CardActionArea>
        <CardHeader
          classes={{
            action: cx('action'),
            title: cx('title'),
            subheader: cx('subheader'),
          }}
          action={
            <IconButton aria-label="settings" sx={{ marginTop: 'auto' }} onClick={handleMoreClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={title || 'Untitled'}
          subheader={
            <>
              <AccessTimeIcon sx={{ marginRight: '4px', fontSize: 16 }} />
              {utcToFormatUserDateTime(openDateTime)}
            </>
          }
        />
      </Card>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handleClose}
        disableRestoreFocus
        elevation={1}
        slotProps={{
          paper: {
            sx: {
              padding: '16px 20px',
            },
          },
        }}
      >
        <section className={cx('menu-links')}>
          <Typography
            color="var(--red-1)"
            variant="body2"
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '8px' }}
            onClick={handleDeleteForm}
          >
            <DeleteForeverIcon fontSize="small" sx={{ marginRight: '4px' }} />
            Remove
          </Typography>
          <Link style={{ textDecoration: 'none' }} target="_blank" to={`/form/${formId}`}>
            <Typography color="var(--gray-3)" variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <OpenInNewIcon fontSize="small" sx={{ marginRight: '4px' }} />
              Open In New Tab
            </Typography>
          </Link>
        </section>
      </Popover>
    </>
  );
};

FormCard.displayName = 'FormCard';

export default FormCard;
