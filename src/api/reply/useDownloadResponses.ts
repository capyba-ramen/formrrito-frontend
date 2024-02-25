import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

export default function useDownloadResponses() {
  const { trigger, isMutating } = useSWRMutation(`/api/reply/responses`, postFetcher);

  return {
    trigger,
    isMutating,
  };
}
