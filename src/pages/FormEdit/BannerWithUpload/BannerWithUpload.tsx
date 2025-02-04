import { useParams } from 'react-router-dom';
import { useFormContext, useWatch } from 'react-hook-form';

import useUploadImage from '@/api/tool/useUploadImage';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import CircularProgress from '@mui/material/CircularProgress';
import useValidateFile from '@/hooks/useValidateFile';
import useNotification from '@/components/NotificationProvider/useNotification';

import * as classNames from 'classnames/bind';
import style from './BannerWithUpload.module.scss';
const cx = classNames.bind(style);

const BannerWithUpload = () => {
  const formId = useParams()?.formId || '';
  const { setValue } = useFormContext();
  const { isMutating, trigger: uploadImage } = useUploadImage();
  const { validateFile } = useValidateFile({
    allowedTypes: ['image/jpeg', 'image/png'],
  });
  const { addNotification } = useNotification();
  const watchImageUrl = useWatch({ name: `imageUrl` });

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
    formData.append('upload_type', 'form');
    formData.append('form_id', formId);

    uploadImage(formData)
      .then((res) => {
        if (!res.data) return;

        setValue('imageUrl', res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={cx('root')}>
      <img src={`${import.meta.env.VITE_CDN_PATH}${watchImageUrl}`} alt="form-banner" />
      <label className={cx('overlay', { show: isMutating })} htmlFor="upload-banner">
        {isMutating ? (
          <CircularProgress size={24} color="secondary" />
        ) : (
          <DriveFolderUploadIcon className={cx('icon')} />
        )}
      </label>
      <input
        accept="image/png, image/jpeg"
        className={cx('input')}
        id="upload-banner"
        type="file"
        onChange={handleUpload}
      />
    </div>
  );
};

BannerWithUpload.displayName = 'BannerWithUpload';

export default BannerWithUpload;
