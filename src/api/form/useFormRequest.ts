import createRequestApi from '@/api/createRequestApi';
import { Form } from '@/types/form';

const {
  useRequest: useFormRequest,
  preload,
  mutate,
} = createRequestApi<Form>({
  key: (formId) => `/api/form/${formId}`,
});

export { preload, mutate };

export default useFormRequest;
