import useSWR from 'swr';
import { getFetcher } from '../fetchers';

export type User = {
  name: string;
};

export default function useUserInfo() {
  const { data, isLoading, isValidating, error, mutate } = useSWR(`/api/user/info`, getFetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  return {
    user: data,
    isFetching: isLoading || isValidating,
    error,
    mutate,
  };
}
