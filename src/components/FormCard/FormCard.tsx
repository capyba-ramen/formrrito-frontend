import { useNavigate } from 'react-router-dom';

import Card, { CardProps } from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import * as classNames from 'classnames/bind';
import style from './FormCard.module.scss';
const cx = classNames.bind(style);

export interface FormCardProps extends CardProps {
  image?: string;
  title?: string;
  openDateTime?: string;
  formId: string;
}

const FormCard = (props: FormCardProps) => {
  const { image, title, openDateTime, formId, ...other } = props;
  const navigate = useNavigate();

  const handleFormClick = () => {
    navigate(`/form/${formId}`);
  };

  return (
    <Card
      classes={{
        root: cx('root', 'card'),
      }}
      elevation={0}
      {...other}
    >
      <CardActionArea>
        <CardMedia component="img" height="144" image={image} onClick={handleFormClick} />
      </CardActionArea>
      <CardHeader
        classes={{
          action: cx('action'),
          title: cx('title'),
          subheader: cx('subheader'),
        }}
        action={
          <IconButton aria-label="settings" sx={{ marginTop: 'auto' }}>
            <MoreVertIcon />
          </IconButton>
        }
        title={title || 'Untitled'}
        subheader={
          <>
            <AccessTimeIcon sx={{ marginRight: '4px', fontSize: 16 }} />
            {openDateTime}
          </>
        }
      />
    </Card>
  );
};

FormCard.displayName = 'FormCard';

export default FormCard;
