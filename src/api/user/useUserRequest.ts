import useSWR from 'swr';
import { getFetcher } from '../fetchers';

export default function useUserRequest() {
  const { data } = useSWR(`/health_check`, getFetcher);

  return {
    data,
  };
}
