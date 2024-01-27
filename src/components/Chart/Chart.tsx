import * as React from 'react';

import { Chart as ChartJS, ChartConfiguration, ChartData } from 'chart.js/auto';

interface ChartProps {
  options?: ChartConfiguration;
  data: ChartData<'pie' | 'bar'>;
  type?: 'pie' | 'bar';
  className?: string;
}

import * as classNames from 'classnames/bind';
import style from './Chart.module.scss';
const cx = classNames.bind(style);

const Chart = (props: ChartProps) => {
  const { data, type = 'pie', options = {}, className } = props;
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const chartRef = React.useRef<ChartJS | null>(null);

  const renderChart = () => {
    const chartDOM = canvasRef.current!;

    chartRef.current = new ChartJS(chartDOM, {
      type,
      data: {
        ...data,
        datasets: data.datasets?.map((d) => ({
          ...d,
          backgroundColor: [
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...options,
      },
    });
  };

  React.useEffect(() => {
    if (!canvasRef.current) return;

    renderChart();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  return (
    <div className={cx('root', className)}>
      <canvas role="img" ref={canvasRef} />
    </div>
  );
};

Chart.displayName = 'Chart';

export default Chart;
