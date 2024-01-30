import createRequestApi from '@/api/createRequestApi';
import { ReplyStatisticsApiData } from '@/types/reply';

const {
  useRequest: useReplyStatisticsRequest,
  preload,
  mutate,
} = createRequestApi<ReplyStatisticsApiData>({
  key: (formId) => (formId ? `/api/reply/statistics/${formId}` : null),
});

export { preload, mutate };

export default useReplyStatisticsRequest;
