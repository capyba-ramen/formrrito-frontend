import { useParams } from 'react-router-dom';
import { useFormContext, Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import useUpdateForm from '@/api/form/useUpdateForm';
import { FormApiFields } from '@/constants/form';
import useClearDirtyFields from '@/hooks/useClearDirtyFields';
import { ImageUrl, ImageUrlType } from '@/constants/form';

import * as classNames from 'classnames/bind';
import style from './FormInfo.module.scss';
const cx = classNames.bind(style);

const FormInfo = () => {
  const { formId } = useParams();
  const {
    control,
    getValues,
    trigger,
    formState: { dirtyFields },
  } = useFormContext();
  const { trigger: updateForm } = useUpdateForm();
  const { clearDirtyFields } = useClearDirtyFields();

  const handleUpdateForm = async (name: keyof typeof FormApiFields) => {
    if (!dirtyFields[name]) return;
    const isValid = await trigger(FormApiFields[name]);
    if (!isValid) return;

    updateForm({
      form_id: formId,
      field: FormApiFields[name],
      value: getValues(name),
    }).then(() => {
      clearDirtyFields();
    });
  };

  return (
    <div className={cx('root')}>
      <div className={cx('banner')}>
        <img src={ImageUrl[getValues('imageUrl') as keyof ImageUrlType]} alt="form-banner" />
      </div>
      <Controller
        control={control}
        name="title"
        rules={{
          maxLength: {
            value: 50,
            message: 'Maximum 50 characters',
          },
        }}
        render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
          <TextField
            value={value}
            variant="standard"
            multiline
            onChange={onChange}
            error={!!error?.type}
            helperText={error?.message}
            ref={ref}
            classes={{
              root: cx('input', 'title-input'),
            }}
            inputProps={{
              className: cx('title'),
            }}
            onBlur={() => {
              handleUpdateForm('title');
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        rules={{
          maxLength: {
            value: 50,
            message: 'Maximum 50 characters',
          },
        }}
        render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
          <TextField
            value={value}
            variant="standard"
            multiline
            onChange={onChange}
            error={!!error?.type}
            helperText={error?.message}
            ref={ref}
            classes={{
              root: cx('input'),
            }}
            inputProps={{
              className: cx('description'),
            }}
            onBlur={() => {
              handleUpdateForm('description');
            }}
          />
        )}
      />
    </div>
  );
};

FormInfo.displayName = 'FormInfo';

export default FormInfo;
