import useSWR from 'swr';

export type User = {
  name: string;
};

export default function useUserInfo() {
  const { data, isLoading, isValidating, error } = useSWR('/api/user/info');

  return {
    user: data,
    isFetching: isLoading || isValidating,
    error,
  };
}
