import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

export default function useSignUp() {
  const { trigger, isMutating } = useSWRMutation('/api/user/signup', postFetcher);

  return {
    trigger,
    isMutating,
  };
}
