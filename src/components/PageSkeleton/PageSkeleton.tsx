import Skeleton from '@mui/material/Skeleton';

import * as classNames from 'classnames/bind';
import style from './PageSkeleton.module.scss';
const cx = classNames.bind(style);

const PageSkeleton = () => (
  <>
    <div className={cx('root')}>
      <Skeleton variant="rectangular" width={100} height={100} sx={{ borderRadius: '8px', marginBottom: '4px' }} />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="30%" />
    </div>
    <Skeleton variant="rectangular" height={40} sx={{ borderRadius: '8px', marginTop: '8px' }} />
    <Skeleton variant="rectangular" height={300} sx={{ borderRadius: '8px', marginTop: '8px' }} />
  </>
);

PageSkeleton.displayName = 'PageSkeleton';

export default PageSkeleton;
