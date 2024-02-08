import { useFormContext, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Options from './Options/Options';
import Tooltip from '@mui/material/Tooltip';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import useDeleteQuestion from '@/api/question/useDeleteQuestion';
import useDuplicateQuestion from '@/api/question/useDuplicateQuestion';
import useFormRequest from '@/api/form/useFormRequest';
import useUpdateQuestion from '@/api/question/useUpdateQuestion';
import useNotification from '@/components/NotificationProvider/useNotification';
import useApiErrorHandlers from '@/api/useApiErrorsHandler';

import { Question } from '@/types/question';
import { OptionField } from '@/types/option';
import { NonOptionQuestionTypes } from '@/constants/question';

import * as classNames from 'classnames/bind';
import style from './QuestionEdit.module.scss';
const cx = classNames.bind(style);

export interface QuestionEditProps {
  qId: string;
  index: number;
  onQuestionSwap: (index1: number, index2: number) => void;
}

const QuestionEdit = (props: QuestionEditProps) => {
  const { qId, index, onQuestionSwap } = props;
  const formId = useParams()?.formId || '';
  const { control, getValues } = useFormContext();
  const { trigger: deleteQuestion } = useDeleteQuestion(qId, formId);
  const { trigger: duplicateQuestion } = useDuplicateQuestion(qId, formId);
  const { trigger: updateQuestion } = useUpdateQuestion();
  const { mutate } = useFormRequest(formId, { revalidateOnMount: false });
  const { addNotification } = useNotification();
  const { errorsHandler } = useApiErrorHandlers();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });
  const watchType = useWatch({ name: `questions.${index}.type` });

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

  const handleUpdateQuestionType = (type: Question['type']) => {
    updateQuestion({
      form_id: formId,
      question_id: qId,
      title: getValues(`questions.${index}.title`),
      description: getValues(`questions.${index}.description`),
      is_required: getValues(`questions.${index}.required`),
      type,
    })
      .then((res) => {
        if (NonOptionQuestionTypes.includes(type)) {
          remove();
        }

        if (res?.data) {
          append({
            optionId: res.data.id,
            title: res.data.title,
          });
        }
      })
      .catch(errorsHandler);
  };

  const handleSwapUp = () => {
    onQuestionSwap(index, index - 1);
  };

  const handleSwapDown = () => {
    onQuestionSwap(index, index + 1);
  };

  return (
    <div className={cx('root')}>
      <div className={cx('header')}>
        <Controller
          control={control}
          name={`questions.${index}.title`}
          rules={{
            maxLength: {
              value: 50,
              message: 'Maximum 50 characters',
            },
          }}
          render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
            <TextField
              label="Question Title"
              value={value}
              variant="standard"
              onChange={onChange}
              error={!!error?.type}
              helperText={error?.message}
              ref={ref}
              sx={{ width: '100%', marginRight: '16px' }}
            />
          )}
        />
        <Controller
          control={control}
          name={`questions.${index}.type`}
          render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
            <FormControl variant="standard" sx={{ minWidth: '200px' }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={value}
                onChange={(e: SelectChangeEvent) => {
                  onChange(Number(e.target.value));
                  handleUpdateQuestionType(Number(e.target.value));
                }}
                ref={ref}
                classes={{ select: cx('select') }}
              >
                <MenuItem value={0}>Short Answer</MenuItem>
                <MenuItem value={1}>Paragraph</MenuItem>
                <MenuItem value={2}>Multiple Choice</MenuItem>
                <MenuItem value={3}>Checkboxes</MenuItem>
                <MenuItem value={4}>Dropdown</MenuItem>
              </Select>
              {error?.message && <FormHelperText>{error?.message}</FormHelperText>}
            </FormControl>
          )}
        />
      </div>
      <Controller
        control={control}
        name={`questions.${index}.description`}
        rules={{
          maxLength: {
            value: 150,
            message: 'Maximum 150 characters',
          },
        }}
        render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
          <TextField
            label="Question Description"
            value={value}
            variant="standard"
            onChange={onChange}
            error={!!error?.type}
            helperText={error?.message}
            ref={ref}
            sx={{ marginTop: '16px', width: '100%' }}
          />
        )}
      />
      <div className={cx('content')}>
        <Options
          index={index}
          options={fields as OptionField & { id: string }[]}
          append={append}
          remove={remove}
          type={watchType}
        />
      </div>
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
            <Typography variant="body2" color="var(--black)" sx={{ marginRight: '4px' }}>
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
        <div>
          <Tooltip title={index === 0 ? '' : 'Swap Up'}>
            <IconButton
              aria-label="swap up"
              color="primary"
              sx={{ marginRight: '8px' }}
              disabled={index === 0}
              onClick={handleSwapUp}
            >
              <ExpandLessIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={index === getValues('questions')?.length - 1 ? '' : 'Swap Down'}>
            <IconButton
              aria-label="swap down"
              color="primary"
              onClick={handleSwapDown}
              disabled={index === getValues('questions')?.length - 1}
            >
              <ExpandMoreIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

QuestionEdit.displayName = 'QuestionEdit';

export default QuestionEdit;
