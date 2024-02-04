import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';
import { FormCreateApiData } from '@/types/form';

export default function useCreateForm() {
  const { data, trigger, isMutating, error } = useSWRMutation<FormCreateApiData>('/api/form/', postFetcher);

  return {
    data,
    trigger,
    isMutating,
    error,
  };
}
