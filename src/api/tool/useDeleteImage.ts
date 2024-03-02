import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

interface DeleteImageArgs {
  delete_type: 'question' | 'form';
  form_id: string;
  question_id: string;
  image_url: string;
}

type DeleteImageApiData = {
  data: string;
};

export default function useDeleteImage() {
  const { data, trigger, isMutating } = useSWRMutation<DeleteImageApiData, unknown, string, DeleteImageArgs>(
    `/delete_image`,
    postFetcher
  );

  return {
    data,
    trigger,
    isMutating,
  };
}
