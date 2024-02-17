import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

export default function useDeleteImage() {
  const { data, trigger, isMutating } = useSWRMutation(`/delete_image`, postFetcher);

  return {
    data,
    trigger,
    isMutating,
  };
}
