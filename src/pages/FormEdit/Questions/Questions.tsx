import { useFormContext, FieldArrayWithId } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import QuestionItem from '@/components/QuestionItem/QuestionItem';
import useUpdateQuestion from '@/api/question/useUpdateQuestion';
import useUpdateOptions from '@/api/option/useUpdateOptions';
import useChangeQuestionOrder from '@/api/question/useChangeQuestionOrder';
import { OptionQuestionTypes } from '@/constants/question';
import useClearDirtyFields from '@/hooks/useClearDirtyFields';
import { QuestionField } from '@/types/question';
import { OptionField } from '@/types/option';

export interface QuestionsProps {
  questions: (QuestionField & FieldArrayWithId)[];
  activeQuestionId?: string;
  onSetActiveQuestionId: (id: string | undefined) => void;
  onSwap: (index1: number, index2: number) => void;
}

const Questions = (props: QuestionsProps) => {
  const { questions, activeQuestionId, onSetActiveQuestionId, onSwap } = props;
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
  } = useFormContext();
  const { dirtyFields } = formState;
  const { clearDirtyFields } = useClearDirtyFields();

  const handleDirtyFieldsQuestion = async (qId: string, index: number) => {
    clearErrors();

    const isValid = await trigger([
      `questions.${index}.title`,
      `questions.${index}.description`,
      `questions.${index}.options`,
    ]);
    if (!isValid) return;

    if (
      dirtyFields?.questions?.[index]?.options ||
      dirtyFields?.questions?.[index]?.title ||
      dirtyFields?.questions?.[index]?.description ||
      dirtyFields?.questions?.[index]?.required
    ) {
      const formValues = getValues();
      const updateOptionsPromise =
        dirtyFields?.questions?.[index]?.options && OptionQuestionTypes.includes(formValues.questions[index].type)
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
        dirtyFields?.questions?.[index]?.title ||
        dirtyFields?.questions?.[index]?.description ||
        dirtyFields?.questions?.[index]?.required
          ? updateQuestion({
              form_id: formId,
              question_id: qId,
              title: formValues.questions[index].title,
              description: formValues.questions[index].description,
              is_required: formValues.questions[index].required,
            })
          : Promise.resolve();

      return Promise.all([updateOptionsPromise, updateQuestionPromise]).then(() => {
        clearDirtyFields();
        clearErrors();
        return true;
      });
    }
  };

  const handleClickAway = (qId: string, index: number) => {
    if (activeQuestionId !== qId) return;

    handleDirtyFieldsQuestion(qId, index);
  };

  const handleClick = (qId: string) => {
    if (errors?.questions) return;

    onSetActiveQuestionId(qId);
  };

  const handleSwap = async (index1: number, index2: number) => {
    if (Object.keys(errors?.questions?.[index1] || {})?.length) return;
    if (index1 < 0 || index2 < 0 || index1 >= questions.length) return;

    if (!(await handleDirtyFieldsQuestion(questions[index1].qId, index1))) {
      return;
    }

    onSwap(index1, index2);

    changeQuestionOrder({
      form_id: formId,
      question_ids_in_order: getValues('questions').map((el: QuestionField) => el.qId),
    }).then(() => {
      clearDirtyFields();
    });
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
          error={Object.keys(errors?.questions?.[index] || {})?.length}
          onQuestionSwap={handleSwap}
          {...q}
        />
      ))}
    </>
  );
};

Questions.displayName = 'Questions';

export default Questions;
