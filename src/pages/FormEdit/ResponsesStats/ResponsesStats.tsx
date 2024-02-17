import { useParams } from 'react-router-dom';
import useReplyStatisticsRequest from '@/api/reply/useReplyStatisticsRequest';
import ResponseStat from '../ResponseStat/ResponseStat';
import { QuestionStat } from '@/types/reply';
import Typography from '@mui/material/Typography';

const ResponsesStats = () => {
  const { formId } = useParams();
  const { data } = useReplyStatisticsRequest(formId, { revalidateOnMount: false });

  return (
    <>
      {!data?.question_stats?.length ? (
        <Typography variant="body1" color="var(--gray-3)" align="center" sx={{ margin: '54px 0' }}>
          No responses yet
        </Typography>
      ) : (
        data?.question_stats?.map((el: QuestionStat, idx) => (
          <ResponseStat
            key={`response-${idx}`}
            title={el.title || `Question ${idx + 1}`}
            count={el.count}
            type={el.type}
            responses={el.responses}
            options={el.options}
          />
        ))
      )}
    </>
  );
};

ResponsesStats.displayName = 'ResponsesStats';

export default ResponsesStats;
