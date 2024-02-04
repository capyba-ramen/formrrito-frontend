import { Outlet } from 'react-router-dom';
import SimpleHeader from '@/components/SimpleHeader/SimpleHeader';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

import * as classNames from 'classnames/bind';
import style from './ConsumerLayout.module.scss';
const cx = classNames.bind(style);

const ConsumerLayout = () => {
  return (
    <AuthProvider type="consumer">
      <div className={cx('root')}>
        <SimpleHeader />
        <main className={cx('main-content')}>
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
};

ConsumerLayout.displayName = 'ConsumerLayout';

export default ConsumerLayout;
