import useSWR from 'swr';
import { generateQueryString } from '@/utils/queryString';
import { FormListApiData } from '@/types/form';

export default function useFormsRequest(
  params: { start: string; size: string; sort: 'desc' | 'asc' } = { start: '1', size: '10', sort: 'desc' }
) {
  const { data, isLoading, isValidating, error, mutate } = useSWR<FormListApiData>(
    `/api/form/list${generateQueryString(params)}`
  );

  return {
    forms: data?.result,
    isFetching: isLoading || isValidating,
    error,
    mutate,
  };
}
