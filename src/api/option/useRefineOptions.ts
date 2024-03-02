import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

interface RefineOptionsArgs {
  question_title: string;
  current_options: string[];
}

type RefineOptionsApiData = {
  data: string[];
};

export default function useRefineOptions() {
  const { trigger, isMutating } = useSWRMutation<RefineOptionsApiData, unknown, string, RefineOptionsArgs>(
    `/api/refine/question/options`,
    postFetcher
  );

  return {
    trigger,
    isMutating,
  };
}
