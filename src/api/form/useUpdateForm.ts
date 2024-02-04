import useSWRMutation from 'swr/mutation';
import { putFetcher } from '../fetchers';

export default function useUpdateForm() {
  const { trigger, isMutating } = useSWRMutation('/api/form/', putFetcher);

  return {
    trigger,
    isMutating,
  };
}
