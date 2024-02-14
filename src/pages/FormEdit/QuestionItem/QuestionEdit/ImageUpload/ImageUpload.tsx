import { useParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

import useUploadImage from '@/api/tool/useUploadImage';
import CircularProgress from '@mui/material/CircularProgress';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import useValidateFile from '@/hooks/useValidateFile';
import useNotification from '@/components/NotificationProvider/useNotification';

import * as classNames from 'classnames/bind';
import style from './ImageUpload.module.scss';
const cx = classNames.bind(style);

export interface ImageUploadProps {
  qId: string;
  index: number;
}

const ImageUpload = (props: ImageUploadProps) => {
  const { qId, index } = props;
  const formId = useParams()?.formId || '';
  const { setValue } = useFormContext();
  const { isMutating, trigger: uploadImage } = useUploadImage();
  const { validateFile } = useValidateFile({
    allowedTypes: ['image/jpeg', 'image/png'],
  });
  const { addNotification } = useNotification();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const { isValid, error } = validateFile(file);

    if (error) {
      addNotification({
        message: error,
      });
    }

    if (!isValid) return;

    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_type', 'question');
    formData.append('form_id', formId);
    formData.append('question_id', qId);

    uploadImage(formData)
      .then((res) => {
        if (!res.data) return;

        setValue(`questions.${index}.imageUrl`, res.data, { shouldDirty: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={cx('root')}>
      <Tooltip title="Upload Image" placement="top">
        <IconButton aria-label="upload" color="primary" component="label" htmlFor="upload-question-image">
          {isMutating ? <CircularProgress size={24} /> : <AddPhotoAlternateOutlinedIcon />}
        </IconButton>
      </Tooltip>
      <input
        accept="image/png, image/jpeg"
        className={cx('input')}
        id="upload-question-image"
        type="file"
        onChange={handleUpload}
      />
    </div>
  );
};

ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
