import createMutationApi from '@/api/createMutationApi';
import { postFetcher } from '../fetchers';

const { useMutation: useSubmitCForm } = createMutationApi({
  key: (formId) => `/api/reply/${formId}`,
  fetcher: postFetcher,
});

export default useSubmitCForm;
