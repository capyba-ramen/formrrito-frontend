import { useParams } from 'react-router-dom';
import { useFormContext, Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useUpdateForm from '@/api/form/useUpdateForm';
import { FormApiFields } from '@/constants/form';
import useClearDirtyFields from '@/hooks/useClearDirtyFields';
import { ImageUrl, ImageUrlType } from '@/constants/form';
import ShareIcon from '@mui/icons-material/Share';
import useNotification from '@/components/NotificationProvider/useNotification';

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
  const { openDialog, addNotification } = useNotification();

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
  const linkUrl = `/c-form/${formId}`;

  const openShortUrlDialog = () => {
    openDialog({
      title: 'Send Form',
      content: "Copy the link below and send it to your friends. They'll be able to fill out your form.",
      children: (
        <div>
          <Typography>Link</Typography>
          <Typography>{linkUrl}</Typography>
        </div>
      ),
      onConfirm: () => {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            addNotification({
              message: 'Copied to clipboard',
            });
          })
          .catch(() => {
            addNotification({
              message: 'Unable to copy text to clipboard',
            });
          });
      },
      confirmBtnText: 'Copy',
    });
  };

  return (
    <div className={cx('root')}>
      <div className={cx('banner')}>
        <img src={ImageUrl[getValues('imageUrl') as keyof ImageUrlType]} alt="form-banner" />
      </div>
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
        <Button variant="outlined" startIcon={<ShareIcon />} size="large" onClick={openShortUrlDialog}>
          Send
        </Button>
      </div>
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
