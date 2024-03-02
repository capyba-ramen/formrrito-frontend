import createRequestApi from '@/api/createRequestApi';
import { generateQueryString } from '@/utils/queryString';
import { Form } from '@/types/form';

type Params = { start?: string; size?: string; sort?: 'desc' | 'asc' };

type FormListApiData = {
  count: number;
  has_next: boolean;
  limit: number;
  offset: number;
  result: Form[];
  next: number;
};

const {
  useRequest: useFormsRequest,
  preload,
  mutate,
} = createRequestApi<FormListApiData>({
  key: (params: Params) => (params ? `/api/form/list${generateQueryString(params)}` : null),
});

export { preload, mutate };

export default useFormsRequest;
