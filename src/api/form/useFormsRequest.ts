import createRequestApi from '@/api/createRequestApi';
import { generateQueryString } from '@/utils/queryString';
import { FormListApiData } from '@/types/form';

const {
  useRequest: useFormsRequest,
  preload,
  mutate,
} = createRequestApi<FormListApiData>({
  key: (
    params: { start?: string; size?: string; sort?: 'desc' | 'asc' } = {
      start: '1',
      size: '10',
      sort: 'desc',
    }
  ) => (params ? `/api/form/list${generateQueryString(params)}` : null),
});

export { preload, mutate };

export default useFormsRequest;
