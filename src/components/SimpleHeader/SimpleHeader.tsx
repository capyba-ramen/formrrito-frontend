import LogoSm from '@/assets/webp/logo-sm.svg';
import Paper from '@mui/material/Paper';

import * as classNames from 'classnames/bind';
import style from './SimpleHeader.module.scss';
const cx = classNames.bind(style);

const SimpleHeader = () => {
  return (
    <Paper elevation={1} className={cx('root')}>
      <a href="/forms">
        <div className={cx('logo')}>
          <img height="44" src={LogoSm} alt="formrrito-logo" />
        </div>
      </a>
    </Paper>
  );
};

SimpleHeader.displayName = 'SimpleHeader';

export default SimpleHeader;
