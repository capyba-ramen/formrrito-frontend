import CircularProgress from '@mui/material/CircularProgress';

import * as classNames from 'classnames/bind';
import style from './PageSpinner.module.scss';
const cx = classNames.bind(style);

const PageSpinner = () => (
  <div className={cx('root')}>
    <CircularProgress />
  </div>
);

PageSpinner.displayName = 'PageSpinner';

export default PageSpinner;
