import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

export default function useCreateShortenedUrl() {
  const { data, trigger, isMutating, error } = useSWRMutation('/api/tool/shortened_url', postFetcher);

  return {
    data,
    trigger,
    isMutating,
    error,
  };
}
