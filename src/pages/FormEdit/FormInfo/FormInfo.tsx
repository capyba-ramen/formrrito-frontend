import { useParams } from 'react-router-dom';
import { useFormContext, Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import useUpdateForm from '@/api/form/useUpdateForm';
import { FormApiFields } from '@/constants/form';
import useClearDirtyFields from '@/hooks/useClearDirtyFields';
import SendLinkButton from '../SendLinkButton/SendLinkButton';
import DownloadExcelButton from '../DownloadExcelButton/DownloadExcelButton';
import BannerWithUpload from '../BannerWithUpload/BannerWithUpload';

import * as classNames from 'classnames/bind';
import style from './FormInfo.module.scss';
const cx = classNames.bind(style);

const FormInfo = () => {
  const formId = useParams()?.formId || '';
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
      <BannerWithUpload />
      <div className={cx('title-share')}>
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
              placeholder="Untitled Form"
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
        <div className={cx('actions')}>
          <DownloadExcelButton />
          <SendLinkButton />
        </div>
      </div>
      <Controller
        control={control}
        name="description"
        rules={{
          maxLength: {
            value: 150,
            message: 'Maximum 150 characters',
          },
        }}
        render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
          <TextField
            value={value}
            placeholder="Form description"
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
