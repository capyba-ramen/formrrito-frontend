import { Outlet } from 'react-router-dom';
import * as classNames from 'classnames/bind';
import style from './ToDoLayout.module.scss';

const cx = classNames.bind(style);

const ToDoLayout = () => {
  return (
    <div className={cx('root')}>
      <div>ToDoLayout</div>
      <Outlet />
    </div>
  );
};

ToDoLayout.displayName = 'ToDoLayout';

export default ToDoLayout;
