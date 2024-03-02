import useSWRMutation from 'swr/mutation';
import { putFetcher } from '../fetchers';

interface UpdateQuestionArgs {
  form_id: string;
  question_id: string;
  title: string;
  description: string;
  type: number;
  is_required: true;
  image_url: string;
}

type UpdateQuestionApiData = {
  data: {
    option: {
      id: string;
      title: string;
    };
    permanent_image_url: string;
  };
};

export default function useUpdateQuestion() {
  const { trigger, isMutating } = useSWRMutation<UpdateQuestionApiData, unknown, string, UpdateQuestionArgs>(
    '/api/question/',
    putFetcher
  );

  return {
    trigger,
    isMutating,
  };
}
