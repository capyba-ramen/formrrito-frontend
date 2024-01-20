import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

export default function useCreateForm() {
  const { trigger, isMutating } = useSWRMutation('/api/form/', postFetcher);

  return {
    trigger,
    isMutating,
  };
}
