import useSWRMutation from 'swr/mutation';
import { putFetcher } from '../fetchers';

export default function useUpdateQuestion() {
  const { trigger, isMutating } = useSWRMutation('/api/question/', putFetcher);

  return {
    trigger,
    isMutating,
  };
}
