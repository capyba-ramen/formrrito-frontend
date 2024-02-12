import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

export default function useUploadImage() {
  const { data, trigger, isMutating, error } = useSWRMutation('/upload_image', postFetcher);

  return {
    data,
    trigger,
    isMutating,
    error,
  };
}
