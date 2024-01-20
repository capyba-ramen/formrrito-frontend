import useSWR, { SWRConfiguration } from 'swr';

export default function useFormRequest(formId?: string, swrOptions?: SWRConfiguration) {
  const { data, isLoading, isValidating, error, mutate } = useSWR(formId ? `/api/form/${formId}` : null, swrOptions);

  return {
    form: data,
    isFetching: isLoading || isValidating,
    error,
    mutate,
  };
}
