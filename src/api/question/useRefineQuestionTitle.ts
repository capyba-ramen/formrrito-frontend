import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

export default function useRefineQuestionTitle() {
  const { trigger, isMutating } = useSWRMutation(`/api/refine/question/title`, postFetcher);

  return {
    trigger,
    isMutating,
  };
}
