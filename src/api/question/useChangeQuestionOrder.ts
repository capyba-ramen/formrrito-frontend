import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

export default function useChangeQuestionOrder() {
  const { trigger, isMutating } = useSWRMutation(`/api/question/order`, postFetcher);

  return {
    trigger,
    isMutating,
  };
}
