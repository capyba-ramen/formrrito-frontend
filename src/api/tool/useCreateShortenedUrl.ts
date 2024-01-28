import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';
import { ShortenedUrlApiData } from '@/types/tool';

export default function useCreateShortenedUrl() {
  const { data, trigger, isMutating, error } = useSWRMutation<ShortenedUrlApiData>(
    '/api/tool/shortened_url',
    postFetcher
  );

  return {
    data,
    trigger,
    isMutating,
    error,
  };
}
