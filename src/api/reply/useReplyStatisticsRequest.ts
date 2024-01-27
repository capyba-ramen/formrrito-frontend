import createRequestApi from '@/api/createRequestApi';
import { ReplyStatisticsApiData } from '@/types/reply';

const {
  useRequest: useReplyStatisticsRequest,
  preload,
  mutate,
} = createRequestApi<ReplyStatisticsApiData>({
  key: (formId) => `/api/reply/statistics/${formId}`,
});

export { preload, mutate };

export default useReplyStatisticsRequest;
