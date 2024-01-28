import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ImgPurrito from '@/assets/images/purrito.png';
import LogoSm from '@/assets/images/logo-sm.svg';

import * as classNames from 'classnames/bind';
import style from './GeneralError.module.scss';
const cx = classNames.bind(style);

interface GeneralErrorProps {
  title?: string;
}

const GeneralError = (props: GeneralErrorProps) => {
  const { title = 'Something went wrong!' } = props;

  return (
    <div className={cx('root')}>
      <Typography variant="h5" fontWeight={600}>
        {title}
      </Typography>
      <div className={cx('container')}>
        <img className={cx('pur')} src={ImgPurrito} alt="something went wrong" />
        <div className={cx('text')}>
          <Button variant="contained" onClick={() => (window.location.href = '/forms')}>
            Go To HomePage
          </Button>
          <img className={cx('logo')} src={LogoSm} alt="logo" />
        </div>
      </div>
    </div>
  );
};

GeneralError.displayName = 'GeneralError';

export default GeneralError;
