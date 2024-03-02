import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

interface ChangeQuestionOrderArgs {
  form_id: string;
  question_ids_in_order: string[];
}

type ChangeQuestionOrderApiData = {
  data: boolean;
};

export default function useChangeQuestionOrder() {
  const { trigger, isMutating } = useSWRMutation<ChangeQuestionOrderApiData, unknown, string, ChangeQuestionOrderArgs>(
    `/api/question/order`,
    postFetcher
  );

  return {
    trigger,
    isMutating,
  };
}
