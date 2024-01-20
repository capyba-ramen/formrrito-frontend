import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

export default function useCreateQuestion(formId?: string) {
  const { trigger, isMutating } = useSWRMutation(formId ? `/api/question/${formId}` : null, postFetcher);

  return {
    trigger,
    isMutating,
  };
}
