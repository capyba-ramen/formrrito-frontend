import useSWR from 'swr';

export type User = {
  name: string;
};

export default function useUserInfoRequest() {
  const { data, isLoading, isValidating, error } = useSWR('/api/user/info');

  return {
    user: data,
    isFetching: isLoading || isValidating,
    error,
  };
}
