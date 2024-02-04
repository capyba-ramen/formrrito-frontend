import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ImgPurrito from '@/assets/webp/purrito.webp';
import LogoSm from '@/assets/webp/logo-sm.svg';

import * as classNames from 'classnames/bind';
import style from './PurritoInfo.module.scss';
const cx = classNames.bind(style);

interface PurritoInfoProps {
  title?: string;
  btnText?: string;
  onBtnClick?: () => void;
}

const PurritoInfo = (props: PurritoInfoProps) => {
  const {
    title = 'Something went wrong!',
    btnText = 'Go To HomePage',
    onBtnClick = () => (window.location.href = '/forms'),
  } = props;

  return (
    <div className={cx('root')}>
      <Typography variant="h5" fontWeight={600}>
        <span className={cx('dot')} /> {title}
      </Typography>
      <div className={cx('container')}>
        <img className={cx('pur')} src={ImgPurrito} alt="purrito" />
        <div className={cx('text')}>
          <Button variant="contained" onClick={onBtnClick}>
            {btnText}
          </Button>
          <img className={cx('logo')} src={LogoSm} alt="logo" />
        </div>
      </div>
    </div>
  );
};

PurritoInfo.displayName = 'PurritoInfo';

export default PurritoInfo;
