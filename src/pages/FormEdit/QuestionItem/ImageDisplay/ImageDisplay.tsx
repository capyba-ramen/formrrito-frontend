import { useFormContext } from 'react-hook-form';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import * as classNames from 'classnames/bind';
import style from './ImageDisplay.module.scss';
const cx = classNames.bind(style);

export interface ImageDisplayProps {
  index: number;
  isEdit?: boolean;
}

const ImageDisplay = (props: ImageDisplayProps) => {
  const { index, isEdit } = props;
  const { watch, setValue } = useFormContext();

  const handleRemoveImage = () => {
    setValue(`questions.${index}.imageUrl`, '', { shouldDirty: true });
  };

  return (
    <>
      {watch(`questions.${index}.imageUrl`) && (
        <div className={cx('root')}>
          <img
            className={cx('image')}
            src={`${import.meta.env.VITE_CDN_PATH}${watch(`questions.${index}.imageUrl`)}`}
            loading="lazy"
          />
          {isEdit && (
            <IconButton aria-label="delete" className={cx('delete-button')} onClick={handleRemoveImage}>
              <CloseIcon />
            </IconButton>
          )}
        </div>
      )}
    </>
  );
};

ImageDisplay.displayName = 'ImageDisplay';

export default ImageDisplay;
