import { useFormContext, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import useDeleteQuestion from '@/api/question/useDeleteQuestion';
import useDuplicateQuestion from '@/api/question/useDuplicateQuestion';
import useFormRequest from '@/api/form/useFormRequest';

import useNotification from '@/components/NotificationProvider/useNotification';

import * as classNames from 'classnames/bind';
import style from './Actions.module.scss';
const cx = classNames.bind(style);

export interface ActionsProps {
  qId: string;
  index: number;
}

const Actions = (props: ActionsProps) => {
  const { qId, index } = props;
  const formId = useParams()?.formId || '';
  const { control } = useFormContext();
  const { trigger: deleteQuestion } = useDeleteQuestion(qId, formId);
  const { trigger: duplicateQuestion } = useDuplicateQuestion(qId, formId);
  const { mutate } = useFormRequest(formId, { revalidateOnMount: false });
  const { addNotification } = useNotification();

  const handleDeleteQuestion = () => {
    deleteQuestion().then(() => {
      addNotification({
        message: 'Question deleted successfully',
      });
      mutate();
    });
  };

  const handleDuplicateQuestion = () => {
    duplicateQuestion().then(() => {
      addNotification({
        message: 'Question added successfully',
      });
      mutate();
    });
  };

  return (
    <div className={cx('actions')}>
      <div className={cx('action-left')}>
        <Tooltip title="Duplicate">
          <IconButton
            aria-label="copy"
            color="primary"
            onClick={handleDuplicateQuestion}
            sx={{ width: '40px', height: '40px' }}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton aria-label="delete" color="primary" onClick={handleDeleteQuestion}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
        <div className={cx('switch')}>
          <Typography variant="body2" color="var(--black)" sx={{ marginRight: '4px', whiteSpace: 'nowrap' }}>
            Required
          </Typography>
          <Controller
            control={control}
            name={`questions.${index}.required`}
            render={({ field: { value = false, onChange, ref } }) => (
              <Switch
                checked={value}
                onChange={(e) => {
                  onChange(e.target.checked);
                }}
                ref={ref}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

Actions.displayName = 'Actions';

export default Actions;
