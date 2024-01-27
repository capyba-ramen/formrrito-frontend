import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useFormContext, Controller } from 'react-hook-form';

import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import useUpdateForm from '@/api/form/useUpdateForm';
import { FormApiFields } from '@/constants/form';
import useClearDirtyFields from '@/hooks/useClearDirtyFields';
import useReplyStatisticsRequest from '@/api/reply/useReplyStatisticsRequest';
import ResponsesStats from '../ResponsesStats/ResponsesStats';

import * as classNames from 'classnames/bind';
import style from './Responses.module.scss';
const cx = classNames.bind(style);

const Responses = () => {
  const { formId } = useParams();
  const {
    control,
    trigger,
    reset,
    formState: { dirtyFields },
  } = useFormContext();
  const { trigger: updateForm } = useUpdateForm();
  const { clearDirtyFields } = useClearDirtyFields();
  const { data } = useReplyStatisticsRequest(formId);

  React.useEffect(() => {
    if (!data) return;

    reset((formValues) => ({
      ...formValues,
      acceptsReply: data?.accepts_reply,
    }));
  }, [data]);

  const handleUpdateAcceptReply = async (value: boolean) => {
    if (!dirtyFields['acceptsReply']) return;
    const isValid = await trigger(FormApiFields['acceptsReply']);
    if (!isValid) return;

    updateForm({
      form_id: formId,
      field: FormApiFields['acceptsReply'],
      value,
    }).then(() => {
      clearDirtyFields();
    });
  };

  return (
    <div>
      <div className={cx('title')}>
        <Typography variant="h6" fontWeight={600}>
          {data?.total} Responses
        </Typography>
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
                  handleUpdateAcceptReply(e.target.checked);
                }}
                ref={ref}
              />
            )}
          />
        </div>
      </div>
      <ResponsesStats />
    </div>
  );
};

Responses.displayName = 'Responses';

export default Responses;
