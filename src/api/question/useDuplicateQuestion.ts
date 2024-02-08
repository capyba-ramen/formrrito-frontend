import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

export default function useDuplicateQuestion(questionId?: string, formId?: string) {
  const { trigger, isMutating } = useSWRMutation(formId ? `/api/question/${formId}/${questionId}` : null, postFetcher);

  return {
    trigger,
    isMutating,
  };
}
