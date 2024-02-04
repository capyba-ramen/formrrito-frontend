import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';

import * as classNames from 'classnames/bind';
import style from './FormCard.module.scss';
const cx = classNames.bind(style);

const SkeletonFormCard = () => {
  return (
    <Card
      classes={{
        root: cx('root', 'card'),
      }}
      elevation={0}
    >
      <CardActionArea>
        <Skeleton variant="rectangular" height={144} />
      </CardActionArea>
      <CardHeader
        classes={{
          title: cx('title'),
        }}
        title={<Skeleton variant="text" width="100%" />}
        subheader={<Skeleton variant="text" width="70%" />}
      />
    </Card>
  );
};

SkeletonFormCard.displayName = 'SkeletonFormCard';

export default SkeletonFormCard;
