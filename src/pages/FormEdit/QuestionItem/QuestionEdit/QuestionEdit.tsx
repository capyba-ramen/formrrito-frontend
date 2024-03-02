import * as React from 'react';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import Options from './Options/Options';
import useDeleteQuestion from '@/api/question/useDeleteQuestion';
import useDuplicateQuestion from '@/api/question/useDuplicateQuestion';
import useFormRequest from '@/api/form/useFormRequest';
import useUpdateQuestion from '@/api/question/useUpdateQuestion';
import useRefineQuestionTitle from '@/api/question/useRefineQuestionTitle';
import useRefineQuestionDescription from '@/api/question/useRefineQuestionDescription';
import useNotification from '@/components/NotificationProvider/useNotification';
import useApiErrorHandlers from '@/api/useApiErrorsHandler';
import ImageUpload from './ImageUpload/ImageUpload';
import ImageDisplay from '../ImageDisplay/ImageDisplay';
import TextFieldWithAISuggestion from './TextFieldWithAISuggestion/TextFieldWithAISuggestion';

import { Question } from '@/types/question';
import { OptionField } from '@/types/option';
import { NonOptionQuestionTypes } from '@/constants/question';

import * as classNames from 'classnames/bind';
import style from './QuestionEdit.module.scss';
const cx = classNames.bind(style);

export interface QuestionEditProps {
  qId: string;
  index: number;
}

const QuestionEdit = (props: QuestionEditProps) => {
  const { qId, index } = props;
  const formId = useParams()?.formId || '';
  const { control, getValues } = useFormContext();
  const { trigger: deleteQuestion } = useDeleteQuestion(qId, formId);
  const { trigger: duplicateQuestion } = useDuplicateQuestion(qId, formId);
  const { trigger: updateQuestion } = useUpdateQuestion();
  const { trigger: refineTitle, isMutating: isRefiningTitle } = useRefineQuestionTitle();
  const { trigger: refineDescription, isMutating: isRefiningDescription } = useRefineQuestionDescription();
  const { mutate } = useFormRequest(formId, { revalidateOnMount: false });
  const { addNotification } = useNotification();
  const { errorsHandler } = useApiErrorHandlers();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });
  const [titleSuggestion, setTitleSuggestion] = React.useState('');
  const [descriptionSuggestion, setDescriptionSuggestion] = React.useState('');

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
      image_url: getValues(`questions.${index}.imageUrl`),
      description: getValues(`questions.${index}.description`),
      is_required: getValues(`questions.${index}.required`),
      type,
    })
      .then((res) => {
        if (res?.data?.option) {
          append({
            optionId: res.data.option.id,
            title: res.data.option.title,
          });
          return;
        }

        if (NonOptionQuestionTypes.includes(type)) {
          remove();
        }
      })
      .catch(errorsHandler);
  };

  const handleRefineTitle = () => {
    refineTitle({
      form_title: getValues('title'),
      form_description: getValues('description'),
      question_title: getValues(`questions.${index}.title`),
    })
      .then((res) => {
        if (res.data) {
          setTitleSuggestion(res.data);
        }
      })
      .catch(errorsHandler);
  };

  const handleRefineDescription = () => {
    refineDescription({
      form_title: getValues('title'),
      form_description: getValues('description'),
      question_title: getValues(`questions.${index}.title`),
      question_description: getValues(`questions.${index}.description`) || '',
    })
      .then((res) => {
        if (res.data) {
          setDescriptionSuggestion(res.data);
        }
      })
      .catch(errorsHandler);
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
            <TextFieldWithAISuggestion
              label="Question Title"
              value={value}
              fieldName={`questions.${index}.title`}
              onChange={onChange}
              error={error}
              onRefineButtonClick={handleRefineTitle}
              isLoading={isRefiningTitle}
              content={titleSuggestion}
              ref={ref}
            />
          )}
        />
        <ImageUpload qId={qId} index={index} className={cx('image-upload')} />
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
      <ImageDisplay index={index} isEdit qId={qId} />
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
          <TextFieldWithAISuggestion
            label="Question Description"
            value={value}
            fieldName={`questions.${index}.description`}
            onChange={onChange}
            error={error}
            onRefineButtonClick={handleRefineDescription}
            isLoading={isRefiningDescription}
            content={descriptionSuggestion}
            ref={ref}
          />
        )}
      />
      <div className={cx('content')}>
        <Options index={index} options={fields as OptionField & { id: string }[]} append={append} remove={remove} />
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
    </div>
  );
};

QuestionEdit.displayName = 'QuestionEdit';

export default QuestionEdit;
