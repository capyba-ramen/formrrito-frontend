import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { QuestionField } from '@/types/question';
import QuestionItem from '@/components/QuestionItem/QuestionItem';
import useUpdateQuestion from '@/api/question/useUpdateQuestion';
import useUpdateOptions from '@/api/option/useUpdateOptions';
import { OptionQuestionTypes } from '@/constants/question';
import useClearDirtyFields from '@/hooks/useClearDirtyFields';

export interface QuestionsProps {
  questions: (QuestionField & { id: string })[];
  activeQuestionId?: string;
  setActiveQuestionId: (id: string | undefined) => void;
  errorQuestionId?: string;
  setErrorQuestionId: (id: string | undefined) => void;
}

const Questions = (props: QuestionsProps) => {
  const { questions, activeQuestionId, setActiveQuestionId, errorQuestionId, setErrorQuestionId } = props;
  const { formId } = useParams();
  const { trigger: updateQuestion } = useUpdateQuestion();
  const { trigger: updateOptions } = useUpdateOptions();
  const { getValues, trigger, formState } = useFormContext();
  const { dirtyFields } = formState;
  const { clearDirtyFields } = useClearDirtyFields();

  const handleClickAway = async (qId: string, index: number) => {
    if (activeQuestionId !== qId) return;

    const isValid = await trigger([`questions.${index}.title`, `questions.${index}.description`]);
    if (!isValid) {
      setErrorQuestionId(qId);
      return;
    }

    setActiveQuestionId(undefined);

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
              options: getValues(`questions.${index}.options`).map((el) => ({
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

      Promise.all([updateOptionsPromise, updateQuestionPromise]).then(() => {
        clearDirtyFields();
        setErrorQuestionId(undefined);
      });
    }
  };

  const handleClick = (qId: string) => {
    if (errorQuestionId) return;

    setActiveQuestionId(qId);
  };

  return (
    <>
      {questions?.map((q, index) => (
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
          error={errorQuestionId === q.qId}
          {...q}
        />
      ))}
    </>
  );
};

Questions.displayName = 'Questions';

export default Questions;
