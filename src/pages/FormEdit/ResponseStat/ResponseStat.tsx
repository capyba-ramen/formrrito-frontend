import { OptionStat } from '@/types/reply';
import { QuestionTypeEnum } from '@/constants/question';
import Typography from '@mui/material/Typography';
import Chart from '@/components/Chart/Chart';

import * as classNames from 'classnames/bind';
import style from './ResponseStat.module.scss';
const cx = classNames.bind(style);

export interface ResponseStatProps {
  title: string;
  count: number;
  type: number;
  responses?: string[];
  options?: OptionStat[];
}

const ResponseStat = (props: ResponseStatProps) => {
  const { title, count, type, responses, options = [] } = props;

  const renderContent = ({
    type,
    responses,
    options,
  }: {
    type: number;
    responses?: string[];
    options?: OptionStat[];
  }) => {
    switch (type) {
      case QuestionTypeEnum.SIMPLE:
      case QuestionTypeEnum.COMPLEX:
        return (
          <>
            {responses?.map((r) => (
              <Typography className={cx('answer')} key={r}>
                {r}
              </Typography>
            ))}
          </>
        );
      case QuestionTypeEnum.SINGLE:
      case QuestionTypeEnum.DROP_DOWN:
        return (
          <Chart
            className={cx('chart')}
            data={{
              labels: options?.map((o) => o.title),
              datasets: [
                {
                  data: options?.map((o) => o.count),
                },
              ],
            }}
          />
        );
      case QuestionTypeEnum.MULTIPLE:
        return (
          <Chart
            type="bar"
            className={cx('chart')}
            data={{
              labels: options?.map((o) => o.title),
              datasets: [
                {
                  data: options?.map((o) => o.count),
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        );
    }
  };

  return (
    <div className={cx('root')}>
      <Typography variant="subtitle1" fontWeight={700}>
        {title}
      </Typography>
      <Typography variant="subtitle2" color="var(--gray-3)">
        {count} responses
      </Typography>
      <div className={cx('content')}>{renderContent({ type, responses, options })}</div>
    </div>
  );
};

ResponseStat.displayName = 'ResponseStat';

export default ResponseStat;
