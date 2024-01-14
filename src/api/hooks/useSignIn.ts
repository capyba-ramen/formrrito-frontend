import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

export default function useSignIn() {
  const { trigger, isMutating } = useSWRMutation(`/api/user/signin`, postFetcher);

  return {
    trigger,
    isMutating,
  };
}
