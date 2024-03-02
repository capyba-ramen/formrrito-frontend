import createRequestApi from '@/api/createRequestApi';
import { QuestionStat } from '@/types/reply';

type ReplyStatisticsApiData = {
  total: number;
  accepts_reply: boolean;
  question_stats: QuestionStat[];
};

const {
  useRequest: useReplyStatisticsRequest,
  preload,
  mutate,
} = createRequestApi<ReplyStatisticsApiData>({
  key: (formId) => (formId ? `/api/reply/statistics/${formId}` : null),
});

export { preload, mutate };

export default useReplyStatisticsRequest;
