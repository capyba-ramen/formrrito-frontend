import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

interface RefineQuestionTitleArgs {
  form_title: string;
  form_description: string;
  question_title: string;
}

type RefineQuestionTitleApiData = {
  data: string;
};

export default function useRefineQuestionTitle() {
  const { trigger, isMutating } = useSWRMutation<RefineQuestionTitleApiData, unknown, string, RefineQuestionTitleArgs>(
    `/api/refine/question/title`,
    postFetcher
  );

  return {
    trigger,
    isMutating,
  };
}
