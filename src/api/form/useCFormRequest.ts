import createRequestApi from '@/api/createRequestApi';
import { Form } from '@/types/form';

const {
  useRequest: useCFormRequest,
  preload,
  mutate,
} = createRequestApi<Form>({
  key: (formId) => `/api/reply/${formId}`,
});

export { preload, mutate };

export default useCFormRequest;
