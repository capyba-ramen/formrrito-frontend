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
import useApiErrorHandlers from '@/api/useApiErrorsHandler';
import useFormRequest from '@/api/form/useFormRequest';
import { Question, QuestionField } from '@/types/question';
import { FormValues } from '@/types/form';
import AddQuestionButton from '../AddQuestionButton/AddQuestionButton';

const Questions = () => {
  const [activeQuestionId, setActiveQuestionId] = React.useState<string | undefined>(undefined);
  const formId = useParams().formId || '';
  const { trigger: updateQuestion } = useUpdateQuestion();
  const { trigger: updateOptions } = useUpdateOptions();
  const { trigger: changeQuestionOrder } = useChangeQuestionOrder();
  const {
    getValues,
    trigger,
    formState,
    clearErrors,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useFormContext();
  const { dirtyFields } = formState;
  const { data, error } = useFormRequest(formId, {
    revalidateOnMount: false,
  });
  const { errorsHandler } = useApiErrorHandlers();

  const {
    append,
    fields: questions,
    swap,
  } = useFieldArray<FormValues, 'questions'>({
    name: 'questions',
  });

  React.useEffect(() => {
    if (!error) return;

    errorsHandler(error);
  }, [error, errorsHandler]);

  React.useEffect(() => {
    if (!data) return;

    reset((formValues) => ({
      ...formValues,
      questions: data?.questions?.map((q: Question) => ({
        qId: q.id,
        type: q.type,
        title: q.title,
        description: q.description,
        required: q.is_required,
        options: q.options?.map((el) => ({
          optionId: el.id,
          title: el.title,
        })),
      })),
    }));
  }, [data]);

  const { clearDirtyFields } = useClearDirtyFields();

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
      questionDirtyFields?.options?.some((o: OptionField) => o.optionId || o.title)
    ) {
      const updateOptionsPromise =
        questionDirtyFields?.options?.some((o: OptionField) => o.optionId || o.title) &&
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
        questionDirtyFields?.title || questionDirtyFields?.description || questionDirtyFields?.required
          ? updateQuestion({
              form_id: formId,
              question_id: qId,
              title: getValues(`questions.${index}.title`),
              description: getValues(`questions.${index}.description`),
              is_required: getValues(`questions.${index}.required`),
              type: getValues(`questions.${index}.type`),
            })
          : Promise.resolve();

      return Promise.all([updateOptionsPromise, updateQuestionPromise])
        .then(([res]) => {
          setValue(
            `questions.${index}.options`,
            res?.data?.map((el: Option) => ({ ...el, optionId: el.id }))
          );

          clearDirtyFields();
          clearErrors();
          return true;
        })
        .catch((err) => {
          setError(`questions.${index}`, { type: 'server', message: err.response.data?.detail });
          setActiveQuestionId(qId);
        });
    }

    return true;
  };

  const handleClickAway = (qId: string, index: number) => {
    if (activeQuestionId !== qId) return;

    handleDirtyFieldsQuestion(qId, index);
    setActiveQuestionId(undefined);
  };

  const handleClick = (qId: string) => {
    if (errors?.questions) return;

    setActiveQuestionId(qId);
  };

  const handleSwap = async (index1: number, index2: number) => {
    if (Object.keys(errors?.questions?.[index1] || {})?.length) return;
    if (index1 < 0 || index2 < 0 || index1 >= questions.length) return;

    const isValid = await handleDirtyFieldsQuestion(questions[index1].qId, index1);
    if (!isValid) return;

    swap(index1, index2);

    changeQuestionOrder({
      form_id: formId,
      question_ids_in_order: getValues('questions').map((el: QuestionField) => el.qId),
    }).then(clearDirtyFields);
  };

  return (
    <>
      {questions?.map((q, index: number) => (
        <QuestionItem
          key={q.id}
          index={index}
          onQuestionClickAway={() => {
            handleClickAway(q.qId, index);
          }}
          onQuestionClick={() => {
            handleClick(q.qId);
          }}
          active={activeQuestionId === q.qId}
          error={!!Object.keys(errors?.questions?.[index] || {})?.length}
          onQuestionSwap={handleSwap}
          {...q}
        />
      ))}
      <AddQuestionButton sx={{ marginTop: '16px' }} append={append} setActiveQuestionId={setActiveQuestionId} />
    </>
  );
};

Questions.displayName = 'Questions';

export default Questions;
