import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

export default function useRefineQuestionDescription() {
  const { trigger, isMutating } = useSWRMutation(`/api/refine/question/description`, postFetcher);

  return {
    trigger,
    isMutating,
  };
}
