import { useFormContext } from 'react-hook-form';

import * as classNames from 'classnames/bind';
import style from './ImageDisplay.module.scss';
const cx = classNames.bind(style);

export interface ImageDisplayProps {
  index: number;
}

const ImageDisplay = (props: ImageDisplayProps) => {
  const { index } = props;
  const { getValues } = useFormContext();

  return (
    <>
      {getValues(`questions.${index}.imageUrl`) && (
        <img className={cx('image')} src={getValues(`questions.${index}.imageUrl`)} loading="lazy" />
      )}
    </>
  );
};

ImageDisplay.displayName = 'ImageDisplay';

export default ImageDisplay;
