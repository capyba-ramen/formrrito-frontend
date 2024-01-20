import useSWRMutation from 'swr/mutation';
import { deleteFetcher } from '../fetchers';

export default function useDeleteForm(questionId?: string, formId?: string) {
  const { trigger, isMutating } = useSWRMutation(
    formId && questionId ? `/api/question/${formId}/${questionId}` : null,
    deleteFetcher
  );

  return {
    trigger,
    isMutating,
  };
}
