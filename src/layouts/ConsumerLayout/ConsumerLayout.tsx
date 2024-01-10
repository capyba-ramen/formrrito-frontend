import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';

import * as classNames from 'classnames/bind';
import style from './ConsumerLayout.module.scss';

const cx = classNames.bind(style);

const ConsumerLayout = () => {
  return (
    <div className={cx('root')}>
      <Header />
      <div>ConsumerLayout</div>
      <Outlet />
    </div>
  );
};

ConsumerLayout.displayName = 'ConsumerLayout';

export default ConsumerLayout;
