import LogoSm from '@/assets/images/logo-sm.svg';
import Paper from '@mui/material/Paper';

import * as classNames from 'classnames/bind';
import style from './SimpleHeader.module.scss';
const cx = classNames.bind(style);

const SimpleHeader = () => {
  return (
    <Paper elevation={1} className={cx('root')}>
      <div className={cx('logo')}>
        <img height="44" src={LogoSm} alt="formrrito-logo" />
      </div>
    </Paper>
  );
};

SimpleHeader.displayName = 'SimpleHeader';

export default SimpleHeader;
