import * as React from 'react';
import * as classNames from 'classnames/bind';

import style from './UserAvatar.module.scss';
const cx = classNames.bind(style);

export interface UserAvatarProps extends React.ComponentPropsWithoutRef<'div'> {
  imgSrc: string;
  width?: React.CSSProperties['width'];
}

const UserAvatar = ({ imgSrc, width }: UserAvatarProps) => {
  return (
    <div className={cx('root')} style={{ '--size': width } as React.CSSProperties}>
      <img src={imgSrc} />
    </div>
  );
};

UserAvatar.displayName = 'UserAvatar';

export default UserAvatar;
