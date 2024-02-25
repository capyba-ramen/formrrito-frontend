import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useFieldArray } from 'react-hook-form';
import QuestionItem from '@/pages/FormEdit/QuestionItem/QuestionItem';
import useUpdateQuestion from '@/api/question/useUpdateQuestion';
import useUpdateOptions from '@/api/option/useUpdateOptions';
import useChangeQuestionOrder from '@/api/question/useChangeQuestionOrder';
import { OptionQuestionTypes } from '@/constants/question';
import useClearDirtyFields from '@/hooks/useClearDirtyFields';
import { Option, OptionField } from '@/types/option';
import { QuestionField } from '@/types/question';
import LinearProgress from '@mui/material/LinearProgress';

import { FormValues } from '@/types/form';
import AddQuestionButton from '../AddQuestionButton/AddQuestionButton';
import useAutoSave from '@/hooks/useAutoSave';

import * as classNames from 'classnames/bind';
import style from './Questions.module.scss';
const cx = classNames.bind(style);

const Questions = () => {
  const [activeQuestionId, setActiveQuestionId] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(false);
  const formId = useParams().formId || '';
  const { trigger: updateQuestion } = useUpdateQuestion();
  const { trigger: updateOptions } = useUpdateOptions();
  const { trigger: changeQuestionOrder } = useChangeQuestionOrder();
  const method = useFormContext();
  const {
    getValues,
    trigger,
    formState,
    clearErrors,
    formState: { errors },
    setValue,
    setError,
  } = method;
  const { dirtyFields } = formState;

  const {
    append,
    fields: questions,
    swap,
  } = useFieldArray<FormValues, 'questions'>({
    name: 'questions',
  });

  const { clearDirtyFields } = useClearDirtyFields();

  const handleQuestionsSubmit = async () => {
    setLoading(true);

    try {
      const promises = questions.map((q, index) => handleDirtyFieldsQuestion(q.qId, index));
      await Promise.all(promises);
    } finally {
      setLoading(false);
    }
  };

  useAutoSave(method, 2000, handleQuestionsSubmit);

  const handleDirtyFieldsQuestion = async (qId: string, index: number) => {
    clearErrors();

    const isValid = await trigger([
      `questions.${index}.title`,
      `questions.${index}.description`,
      `questions.${index}.options`,
    ]);
    if (!isValid) return;

    const questionDirtyFields = dirtyFields?.questions?.[index];

    if (
      questionDirtyFields?.title ||
      questionDirtyFields?.description ||
      questionDirtyFields?.required ||
      questionDirtyFields?.options?.some((o: OptionField) => o.optionId || o.title) ||
      questionDirtyFields?.options === true ||
      questionDirtyFields?.imageUrl
    ) {
      const updateOptionsPromise =
        (questionDirtyFields?.options?.some((o: OptionField) => o.optionId || o.title) ||
          questionDirtyFields?.options === true) &&
        OptionQuestionTypes.includes(getValues(`questions.${index}.type`))
          ? updateOptions({
              formId,
              questionId: qId,
              options: getValues(`questions.${index}.options`).map((el: OptionField) => ({
                id: el.optionId || '',
                title: el.title,
              })),
            })
          : Promise.resolve();

      const updateQuestionPromise =
        questionDirtyFields?.title ||
        questionDirtyFields?.description ||
        questionDirtyFields?.required ||
        questionDirtyFields?.imageUrl
          ? updateQuestion({
              form_id: formId,
              question_id: qId,
              title: getValues(`questions.${index}.title`),
              description: getValues(`questions.${index}.description`),
              is_required: getValues(`questions.${index}.required`),
              type: getValues(`questions.${index}.type`),
              image_url: getValues(`questions.${index}.imageUrl`),
            })
          : Promise.resolve();

      return Promise.all([updateOptionsPromise, updateQuestionPromise])
        .then(([res, questionRes]) => {
          setValue(
            `questions.${index}.options`,
            res?.data?.map((el: Option) => ({ ...el, optionId: el.id }))
          );
          setValue(`questions.${index}.imageUrl`, questionRes?.data?.permanent_image_url);
          clearErrors();
          return true;
        })
        .catch((err) => {
          if (err?.response?.data) {
            setError(`questions.${index}`, { type: 'server', message: err.response.data.detail });
            setActiveQuestionId(qId);
          }
        })
        .finally(clearDirtyFields);
    }

    return true;
  };

  const handleClickAway = (qId: string, index: number) => {
    if (activeQuestionId !== qId || errors?.questions?.[index]) return;

    setActiveQuestionId(undefined);
  };

  const handleClick = (qId: string) => {
    if (errors?.questions) return;

    setActiveQuestionId(qId);
  };

  const handleSwap = async (index1: number, index2: number) => {
    if (Object.keys(errors?.questions?.[index1] || {})?.length) return;
    if (index1 < 0 || index2 < 0 || index1 >= questions.length) return;

    const isSuccess = await handleDirtyFieldsQuestion(questions[index1].qId, index1);
    if (!isSuccess) return;

    swap(index1, index2);

    changeQuestionOrder({
      form_id: formId,
      question_ids_in_order: getValues('questions').map((el: QuestionField) => el.qId),
    }).then(() => {
      /**
       * react-hook-form swap will cause swaped fields to be dirty though content is the same, so we need to clear dirty fields
       * ref: https://github.com/react-hook-form/react-hook-form/issues/8309
       **/
      clearDirtyFields();
    });
  };

  return (
    <div>
      {loading && (
        <div className={cx('progress')}>
          <LinearProgress />
        </div>
      )}
      {questions?.map((q, index: number) => (
        <QuestionItem
          index={index}
          key={q.qId}
          active={activeQuestionId === q.qId}
          error={!!Object.keys(errors?.questions?.[index] || {})?.length}
          onQuestionSwap={handleSwap}
          qId={q.qId}
          onClick={() => {
            handleClick(q.qId);
          }}
          onQuestionClickAway={() => {
            handleClickAway(q.qId, index);
          }}
        />
      ))}
      <AddQuestionButton sx={{ marginTop: '16px' }} append={append} setActiveQuestionId={setActiveQuestionId} />
    </div>
  );
};

Questions.displayName = 'Questions';

export default Questions;
