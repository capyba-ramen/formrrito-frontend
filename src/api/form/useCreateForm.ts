import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

type FormCreateApiData = {
  data: {
    form_id: string;
  };
};

export default function useCreateForm() {
  const { data, trigger, isMutating, error } = useSWRMutation<FormCreateApiData, unknown, string>(
    '/api/form/',
    postFetcher
  );

  return {
    data,
    trigger,
    isMutating,
    error,
  };
}
