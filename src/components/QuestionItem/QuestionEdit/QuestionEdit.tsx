import * as React from 'react';
import { useFormContext, Controller, useWatch, useFieldArray } from 'react-hook-form';
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
import AddOption from './AddOption';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import useDeleteQuestion from '@/api/question/useDeleteQuestion';
import useFormRequest from '@/api/form/useFormRequest';
import useUpdateQuestion from '@/api/question/useUpdateQuestion';
import useNotification from '@/components/NotificationProvider/useNotification';
import useErrorsHandler from '@/hooks/useErrorsHandler';
import { Question } from '@/types/question';
import Option from './Option/Option';
import { NonOptionQuestionTypes, QuestionTypeEnum } from '@/constants/question';

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
  const { control, getValues, formState } = useFormContext();
  const watchType = useWatch({ name: `questions.${index}.type` });
  const { trigger: deleteQuestion } = useDeleteQuestion(qId, formId);
  const { trigger: updateQuestion } = useUpdateQuestion();
  const { mutate } = useFormRequest(formId, { revalidateOnMount: false });
  const { addNotification } = useNotification();
  const { errorsHandler } = useErrorsHandler();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions[${index}].options`,
  });

  const handleDeleteQuestion = () => {
    deleteQuestion().then(() => {
      addNotification({
        message: 'Question deleted successfully',
      });
      mutate();
    });
  };

  const handleUpdateQuestionType = (type: Question['type']) => {
    updateQuestion({
      form_id: formId,
      question_id: qId,
      type,
    })
      .then(() => {
        if (NonOptionQuestionTypes.includes(type)) {
          remove();
        }
      })
      .catch(errorsHandler);
  };

  React.useEffect(() => {
    getValues();
  }, [formState, getValues]);

  const renderOptions = () => {
    switch (watchType) {
      case QuestionTypeEnum.SIMPLE:
        return <div>ShortAnswer</div>;
      case QuestionTypeEnum.COMPLEX:
        return <div>Paragraph</div>;
      case QuestionTypeEnum.SINGLE:
        return (
          <>
            <div className={cx('options')}>
              {fields?.map((el, idx) => (
                <Option
                  key={el.id}
                  name={`questions.${index}.options.${idx}.title`}
                  prefix={<Radio />}
                  onRemove={() => {
                    remove(idx);
                  }}
                />
              ))}
            </div>
            <AddOption append={append} currentLength={fields?.length} />
          </>
        );
      case QuestionTypeEnum.MULTIPLE:
        return (
          <>
            <div className={cx('options')}>
              {fields?.map((el, idx) => (
                <Option
                  key={el.id}
                  name={`questions.${index}.options.${idx}.title`}
                  prefix={<Checkbox />}
                  onRemove={() => {
                    remove(idx);
                  }}
                />
              ))}
            </div>
            <AddOption append={append} currentLength={fields?.length} />
          </>
        );
      case QuestionTypeEnum.DROP_DOWN:
        return (
          <>
            <div className={cx('options')}>
              {fields?.map((el, idx) => (
                <Option
                  key={el.id}
                  name={`questions.${index}.options.${idx}.title`}
                  prefix={
                    <Typography variant="subtitle1" component="p">
                      {idx + 1}. &nbsp;&nbsp;
                    </Typography>
                  }
                  onRemove={() => {
                    remove(idx);
                  }}
                />
              ))}
            </div>
            <AddOption append={append} currentLength={fields?.length} />
          </>
        );
      default:
        return undefined;
    }
  };

  const handleSwapUp = () => {
    onQuestionSwap(qId, -1);
  };

  const handleSwapDown = () => {
    onQuestionSwap(qId, 1);
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
      <div className={cx('content')}>{renderOptions()}</div>
      <div className={cx('actions')}>
        <div className={cx('action-left')}>
          <Tooltip title="Duplicate">
            <IconButton aria-label="copy" color="primary" sx={{ width: '40px', height: '40px' }}>
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
          <Tooltip title="Swap Up">
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
          <Tooltip title="Swap Down">
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
