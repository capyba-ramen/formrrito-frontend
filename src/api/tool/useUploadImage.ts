import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

type UploadImageApiData = {
  data: string;
};

export default function useUploadImage() {
  const { data, trigger, isMutating, error } = useSWRMutation<UploadImageApiData, unknown, string, FormData>(
    '/upload_image',
    postFetcher
  );

  return {
    data,
    trigger,
    isMutating,
    error,
  };
}
