import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

interface CreateShortenedUrlArgs {
  url: string;
}

type CreateShortenedUrlApiData = {
  data: string;
};

export default function useCreateShortenedUrl() {
  const { data, trigger, isMutating, error } = useSWRMutation<
    CreateShortenedUrlApiData,
    unknown,
    string,
    CreateShortenedUrlArgs
  >('/api/tool/shortened_url', postFetcher);

  return {
    data,
    trigger,
    isMutating,
    error,
  };
}
