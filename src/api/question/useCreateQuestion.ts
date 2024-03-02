import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

type CreateQuestionApiData = {
  data: {
    question_id: string;
  };
};

export default function useCreateQuestion(formId?: string) {
  const { trigger, isMutating } = useSWRMutation<CreateQuestionApiData>(
    formId ? `/api/question/${formId}` : null,
    postFetcher
  );

  return {
    trigger,
    isMutating,
  };
}
