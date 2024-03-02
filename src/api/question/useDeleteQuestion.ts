import useSWRMutation from 'swr/mutation';
import { deleteFetcher } from '../fetchers';

type DeleteQuestionApiData = {
  data: boolean;
};

export default function useDeleteQuestion(questionId?: string, formId?: string) {
  const { trigger, isMutating } = useSWRMutation<DeleteQuestionApiData>(
    formId && questionId ? `/api/question/${formId}/${questionId}` : null,
    deleteFetcher
  );

  return {
    trigger,
    isMutating,
  };
}
