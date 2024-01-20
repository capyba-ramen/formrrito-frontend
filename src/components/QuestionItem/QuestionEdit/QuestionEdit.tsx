import { useFormContext, Controller, useWatch } from 'react-hook-form';
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

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import useDeleteQuestion from '@/api/question/useDeleteQuestion';
import useFormRequest from '@/api/form/useFormRequest';
import useUpdateQuestion from '@/api/question/useUpdateQuestion';
import useNotification from '@/components/NotificationProvider/useNotification';
import useErrorsHandler from '@/hooks/useErrorsHandler';
import { Question } from '@/types/question';

import * as classNames from 'classnames/bind';
import style from './QuestionEdit.module.scss';
const cx = classNames.bind(style);

export interface QuestionEditProps {
  qId: string;
  index: number;
}

const QuestionEdit = (props: QuestionEditProps) => {
  const { qId, index } = props;
  const { formId } = useParams();
  const { control, getValues } = useFormContext();
  const watchType = useWatch({ name: `questions.${index}.type` });
  const { trigger: deleteQuestion } = useDeleteQuestion(qId, formId);
  const { trigger: updateQuestion } = useUpdateQuestion();
  const { mutate } = useFormRequest(formId);
  const { addNotification } = useNotification();
  const { errorsHandler } = useErrorsHandler();

  const handleDeleteQuestion = () => {
    deleteQuestion().then(() => {
      addNotification({
        message: 'Question deleted successfully',
      });
      mutate();
    });
  };

  const handleUpdateQuestion = () => {
    updateQuestion({
      form_id: formId,
      question_id: qId,
      title: getValues(`questions.${index}.title`),
      description: getValues(`questions.${index}.description`),
      type: getValues(`questions.${index}.type`),
      is_required: getValues(`questions.${index}.required`),
    }).then((res) => {
      console.log(res);
    });
  };

  const handleUpdateQuestionType = (type: Question['type']) => {
    updateQuestion({
      form_id: formId,
      question_id: qId,
      type,
    })
      .then((res) => {
        console.log(res);
      })
      .catch(errorsHandler);
  };

  const renderOptions = () => {
    switch (watchType) {
      case 0:
        return <div>ShortAnswer</div>;
      case 1:
        return <div>Paragraph</div>;
      case 2:
        return <div>Multiple Choice</div>;
      case 3:
        return <div>Checkboxes</div>;
      case 4:
        return <div>Dropdown</div>;
      default:
        return undefined;
    }
  };

  return (
    <div
      tabIndex={0}
      className={cx('root')}
      onFocus={() => {
        console.log(`onFocus!! ${qId}`);
      }}
      onBlur={() => {
        console.log(`onBlur!! ${qId}`);
      }}
    >
      <div className={cx('header')}>
        <Controller
          control={control}
          name={`questions.${index}.title`}
          rules={{}}
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
        rules={{}}
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
      <div className={cx('content')}>{renderOptions()}</div>
      <div className={cx('actions')}>
        <IconButton aria-label="copy" color="primary" sx={{ width: '40px', height: '40px' }}>
          <ContentCopyIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete" color="primary" onClick={handleDeleteQuestion}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
        <div className={cx('switch')}>
          <Typography variant="body2" color="var(--black)">
            Required
          </Typography>
          <Controller
            control={control}
            name={`questions.${index}.required`}
            rules={{}}
            render={({ field: { value = false, onChange, ref }, fieldState: { error } }) => (
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

QuestionEdit.displayName = 'QuestionEdit';

export default QuestionEdit;
