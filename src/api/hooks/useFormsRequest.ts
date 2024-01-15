import useSWR from 'swr';
import { generateQueryString } from '../../utils/queryString';

export type Form = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  opened_at: string;
  user_id: string;
  accepts_reply: boolean;
};

export default function useFormsRequest(
  params: { start: string; size: string; sort: 'desc' | 'asc' } = { start: '1', size: '10', sort: 'desc' }
) {
  const { data, isLoading, isValidating, error } = useSWR(`/api/form/list${generateQueryString(params)}`);

  return {
    forms: data?.result,
    isFetching: isLoading || isValidating,
    error,
  };
}
