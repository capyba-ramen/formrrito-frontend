import * as classNames from 'classnames/bind';
import style from './TemplateItem.module.scss';
import { Typography } from '@mui/material';
const cx = classNames.bind(style);

export interface TemplateItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image?: string;
  title?: string;
}

const TemplateItem = (props: TemplateItemProps) => {
  const { image, title, ...other } = props;

  return (
    <div className={cx('root')} {...other}>
      <div className={cx('image')}>
        <img src={image} />
      </div>
      <Typography variant="body2" align="center">
        {title}
      </Typography>
    </div>
  );
};

TemplateItem.displayName = 'TemplateItem';

export default TemplateItem;
