import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

export default function useRefineOptions() {
  const { trigger, isMutating } = useSWRMutation(`/api/refine/question/options`, postFetcher);

  return {
    trigger,
    isMutating,
  };
}
