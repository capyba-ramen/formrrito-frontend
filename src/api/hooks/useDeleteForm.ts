import useSWRMutation from 'swr/mutation';
import { deleteFetcher } from '../fetchers';

export default function useDeleteForm(formId: string) {
  const { trigger, isMutating } = useSWRMutation(`/api/form/${formId}`, deleteFetcher);

  return {
    trigger,
    isMutating,
  };
}
