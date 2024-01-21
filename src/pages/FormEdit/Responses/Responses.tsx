import { useParams } from 'react-router-dom';
import { useFormContext, Controller } from 'react-hook-form';

import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import useUpdateForm from '@/api/form/useUpdateForm';
import { FormApiFields } from '@/constants/form';

import * as classNames from 'classnames/bind';
import style from './Responses.module.scss';
const cx = classNames.bind(style);

const Responses = () => {
  const { formId } = useParams();
  const {
    control,
    getValues,
    formState: { dirtyFields },
  } = useFormContext();
  const { trigger: updateForm } = useUpdateForm();

  const handleUpdateForm = (name: keyof typeof FormApiFields) => {
    if (!dirtyFields[name]) return;

    updateForm({
      form_id: formId,
      field: FormApiFields[name],
      value: getValues(name),
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
          name="acceptsResponses"
          render={({ field: { value = false, onChange, ref } }) => (
            <Switch
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked);
                handleUpdateForm('acceptsResponses');
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
