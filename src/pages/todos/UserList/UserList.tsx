import UserAvatar from './UserAvatar/UserAvatar';
import User1 from '../../../assets/images/1.png';
import useUserRequest from '../../../api/user/useUserRequest';

import * as classNames from 'classnames/bind';
import style from './UserList.module.scss';

const cx = classNames.bind(style);

const UserList = () => {
  const { data } = useUserRequest();
  console.log(data);

  return (
    <div className={cx('root')}>
      <UserAvatar imgSrc={User1} />
      {import.meta.env.VITE_SOME_KEY}
      {data}
    </div>
  );
};

UserList.displayName = 'UserList';

export default UserList;
