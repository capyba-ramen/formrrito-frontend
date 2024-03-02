import * as React from 'react';
import { useFormContext, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';

import Options from './Options/Options';
import useUpdateQuestion from '@/api/question/useUpdateQuestion';
import useRefineQuestionTitle from '@/api/question/useRefineQuestionTitle';
import useRefineQuestionDescription from '@/api/question/useRefineQuestionDescription';
import useApiErrorHandlers from '@/api/useApiErrorsHandler';
import ImageUpload from './ImageUpload/ImageUpload';
import ImageDisplay from '../ImageDisplay/ImageDisplay';
import TextFieldWithAISuggestion from './TextFieldWithAISuggestion/TextFieldWithAISuggestion';
import Actions from './Actions/Actions';

import { Question } from '@/types/question';
import { OptionField } from '@/types/option';
import { NonOptionQuestionTypes, QuestionTypeEnum } from '@/constants/question';

import * as classNames from 'classnames/bind';
import style from './QuestionEdit.module.scss';
const cx = classNames.bind(style);

export interface QuestionEditProps {
  qId: string;
  index: number;
  isEditMode: boolean;
}

const QuestionEdit = (props: QuestionEditProps) => {
  const { qId, index, isEditMode } = props;
  const formId = useParams()?.formId || '';
  const { control, getValues } = useFormContext();
  const { trigger: updateQuestion } = useUpdateQuestion();
  const { trigger: refineTitle, isMutating: isRefiningTitle } = useRefineQuestionTitle();
  const { trigger: refineDescription, isMutating: isRefiningDescription } = useRefineQuestionDescription();
  const watchType = useWatch({ name: `questions.${index}.type` });
  const { errorsHandler } = useApiErrorHandlers();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });
  const [titleSuggestion, setTitleSuggestion] = React.useState('');
  const [descriptionSuggestion, setDescriptionSuggestion] = React.useState('');

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

  const renderOptions = () => {
    switch (watchType) {
      case QuestionTypeEnum.SIMPLE:
        return <div>Short Answer Text</div>;
      case QuestionTypeEnum.COMPLEX:
        return <div>Long Answer Text</div>;
      case QuestionTypeEnum.SINGLE:
        return (
          <RadioGroup>
            {getValues(`questions.${index}.options`)?.map((el: OptionField, idx: number) => (
              <FormControlLabel value={idx} key={`${qId}-${idx}`} control={<Radio />} label={el.title} />
            ))}
          </RadioGroup>
        );
      case QuestionTypeEnum.MULTIPLE:
        return (
          <FormGroup>
            {getValues(`questions.${index}.options`)?.map((el: OptionField, idx: number) => (
              <FormControlLabel key={`${qId}-${idx}`} value={idx} control={<Checkbox />} label={el.title} />
            ))}
          </FormGroup>
        );
      case QuestionTypeEnum.DROP_DOWN:
        return (
          <ol>
            {getValues(`questions.${index}.options`)?.map((el: OptionField, idx: number) => (
              <li key={`${qId}-${idx}`}>{el.title}</li>
            ))}
          </ol>
        );
      default:
        return undefined;
    }
  };

  return (
    <div className={cx('root')}>
      {isEditMode ? (
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
      ) : (
        <Typography variant="subtitle1" fontWeight={700}>
          {getValues(`questions.${index}.required`) && <span style={{ color: 'var(--red-1)' }}>*</span>}{' '}
          {`${index + 1}. ${getValues(`questions.${index}.title`) || `Question ${index + 1}`}`}
        </Typography>
      )}
      <ImageDisplay index={index} isEdit={isEditMode} qId={qId} />
      {isEditMode ? (
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
      ) : (
        <>
          {getValues(`questions.${index}.description`) && (
            <Typography variant="subtitle2" color="var(--gray-3)">
              {getValues(`questions.${index}.description`)}
            </Typography>
          )}
        </>
      )}
      <div className={cx('options', { editing: isEditMode })}>
        {isEditMode ? (
          <Options index={index} options={fields as OptionField & { id: string }[]} append={append} remove={remove} />
        ) : (
          renderOptions()
        )}
      </div>
      {isEditMode && <Actions qId={qId} index={index} />}
    </div>
  );
};

QuestionEdit.displayName = 'QuestionEdit';

export default QuestionEdit;
