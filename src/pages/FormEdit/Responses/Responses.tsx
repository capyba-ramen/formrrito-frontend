import { useParams } from 'react-router-dom';
import { useFormContext, Controller } from 'react-hook-form';

import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import useUpdateForm from '@/api/form/useUpdateForm';
import { FormApiFields } from '@/constants/form';
import useClearDirtyFields from '@/hooks/useClearDirtyFields';

import * as classNames from 'classnames/bind';
import style from './Responses.module.scss';
const cx = classNames.bind(style);

const Responses = () => {
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
    <div>
      <h4>Responses</h4>
      <div className={cx('switch')}>
        <Typography variant="body2" color="var(--black)" sx={{ marginRight: '4px' }}>
          Accept Responses
        </Typography>
        <Controller
          control={control}
          name="acceptsReply"
          render={({ field: { value = false, onChange, ref } }) => (
            <Switch
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked);
                handleUpdateForm('acceptsReply');
              }}
              ref={ref}
            />
          )}
        />
      </div>
    </div>
  );
};

Responses.displayName = 'Responses';

export default Responses;
