import useSWRMutation from 'swr/mutation';
import { putFetcher } from '../fetchers';

interface UpdateFormArgs {
  form_id: string;
  field: string;
  value: string | boolean;
}

type UpdateFormApiData = {
  data: boolean;
};

export default function useUpdateForm() {
  const { trigger, isMutating } = useSWRMutation<UpdateFormApiData, unknown, string, UpdateFormArgs>(
    '/api/form/',
    putFetcher
  );

  return {
    trigger,
    isMutating,
  };
}
