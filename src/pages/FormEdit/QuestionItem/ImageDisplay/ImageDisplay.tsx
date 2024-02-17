import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useDeleteImage from '@/api/tool/useDeleteImage';
import useApiErrorHandlers from '@/api/useApiErrorsHandler';

import * as classNames from 'classnames/bind';
import style from './ImageDisplay.module.scss';
const cx = classNames.bind(style);

export interface ImageDisplayProps {
  qId: string;
  index: number;
  isEdit?: boolean;
}

const ImageDisplay = (props: ImageDisplayProps) => {
  const { qId, index, isEdit } = props;
  const { watch, setValue, getValues } = useFormContext();
  const formId = useParams()?.formId || '';
  const { trigger: deleteImage } = useDeleteImage();
  const { errorsHandler } = useApiErrorHandlers();

  const handleRemoveImage = () => {
    deleteImage({
      delete_type: 'question',
      form_id: formId,
      question_id: qId,
      image_url: getValues(`questions.${index}.imageUrl`),
    })
      .then(() => {
        setValue(`questions.${index}.imageUrl`, '', { shouldDirty: true });
      })
      .catch(errorsHandler);
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
