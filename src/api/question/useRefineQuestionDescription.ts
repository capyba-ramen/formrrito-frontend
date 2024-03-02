import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

interface RefineQuestionDescriptionArgs {
  form_title: string;
  form_description: string;
  question_title: string;
  question_description: string;
}
type RefineQuestionDescriptionApiData = {
  data: string;
};

export default function useRefineQuestionDescription() {
  const { trigger, isMutating } = useSWRMutation<
    RefineQuestionDescriptionApiData,
    unknown,
    string,
    RefineQuestionDescriptionArgs
  >(`/api/refine/question/description`, postFetcher);

  return {
    trigger,
    isMutating,
  };
}
