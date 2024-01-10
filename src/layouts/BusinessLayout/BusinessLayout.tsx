import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';

import * as classNames from 'classnames/bind';
import style from './BusinessLayout.module.scss';

const cx = classNames.bind(style);

const BusinessLayout = () => {
  return (
    <div className={cx('root')}>
      <Header />
      <main className={cx('main-content')}>
        <Outlet />
      </main>
    </div>
  );
};

BusinessLayout.displayName = 'BusinessLayout';

export default BusinessLayout;
