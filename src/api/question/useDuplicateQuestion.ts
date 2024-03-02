import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

type DuplicateQuestionApiData = {
  data: {
    question_id: string;
  };
};

export default function useDuplicateQuestion(questionId?: string, formId?: string) {
  const { trigger, isMutating } = useSWRMutation<DuplicateQuestionApiData>(
    formId ? `/api/question/${formId}/${questionId}` : null,
    postFetcher
  );

  return {
    trigger,
    isMutating,
  };
}
