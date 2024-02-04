import { useParams } from 'react-router-dom';
import useReplyStatisticsRequest from '@/api/reply/useReplyStatisticsRequest';
import ResponseStat from '../ResponseStat/ResponseStat';
import { QuestionStat } from '@/types/reply';

const ResponsesStats = () => {
  const { formId } = useParams();
  const { data } = useReplyStatisticsRequest(formId, { revalidateOnMount: false });

  return (
    <>
      {data?.question_stats?.map((el: QuestionStat, idx) => (
        <ResponseStat
          key={`response-${idx}`}
          title={el.title || `Question ${idx + 1}`}
          count={el.count}
          type={el.type}
          responses={el.responses}
          options={el.options}
        />
      ))}
    </>
  );
};

ResponsesStats.displayName = 'ResponsesStats';

export default ResponsesStats;
