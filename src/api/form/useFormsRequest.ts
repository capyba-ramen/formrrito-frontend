import createRequestApi from '@/api/createRequestApi';
import { generateQueryString } from '@/utils/queryString';
import { FormListApiData } from '@/types/form';

type Params = { start?: string; size?: string; sort?: 'desc' | 'asc' };

const {
  useRequest: useFormsRequest,
  preload,
  mutate,
} = createRequestApi<FormListApiData>({
  key: (params: Params) => (params ? `/api/form/list${generateQueryString(params)}` : null),
});

export { preload, mutate };

export default useFormsRequest;
