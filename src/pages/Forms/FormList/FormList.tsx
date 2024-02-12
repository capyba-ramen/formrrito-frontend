import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import FormCard from '@/components/FormCard/FormCard';
import SkeletonFormCard from '@/components/FormCard/SkeletonFormCard';
import useFormsRequest from '@/api/form/useFormsRequest';
import { Form } from '@/types/form';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import Tooltip from '@mui/material/Tooltip';

import * as classNames from 'classnames/bind';
import style from './FormList.module.scss';
const cx = classNames.bind(style);

const mergeResponseData = (prev: Form[], curr: Form[]) => {
  if (!prev) return curr;

  const uniqueElements = new Set([...prev, ...curr].map((el) => JSON.stringify(el)));
  return Array.from(uniqueElements).map((el) => JSON.parse(el));
};

const FormList = () => {
  const [start, setStart] = React.useState('1');
  const [sortDesc, setSortDesc] = React.useState(true);
  const [forms, setForms] = React.useState<Form[]>([]);
  const { data, isFetching } = useFormsRequest({ start, size: '12', sort: sortDesc ? 'desc' : 'asc' });
  const ref = React.useRef(null);
  useIntersectionObserver(ref, (entry) => {
    const isVisible = !!entry?.isIntersecting;
    if (isVisible) {
      setStart(`${data?.next}`);
    }
  });

  const handleClick = () => {
    setSortDesc((prev) => !prev);
    setStart('1');
    setForms([]);
  };

  React.useEffect(() => {
    if (!data) return;

    setForms((prev) => mergeResponseData(prev, data.result));
  }, [data]);

  const onDelete = (formId: string) => {
    setForms((prev) => prev.filter((el: Form) => el.id !== formId));
  };

  return (
    <section className={cx('root')}>
      <div className={cx('title')}>
        <Typography fontWeight={700}>Recent Forms</Typography>
        <Tooltip title="Sort by date opened">
          <Button
            startIcon={
              <SwitchRightIcon
                sx={{
                  transform: sortDesc ? 'rotate(90deg)' : 'rotate(270deg)',
                  transition: 'transform 0.2s',
                }}
              />
            }
            variant="outlined"
            size="small"
            onClick={handleClick}
          >
            Sort
          </Button>
        </Tooltip>
      </div>
      <Grid container spacing={2}>
        {isFetching && forms?.length === 0 ? (
          <>
            {Array.from(new Array(6)).map((_, idx) => (
              <Grid key={idx} item xs={6} sm={6} md={4} lg={3}>
                <SkeletonFormCard />
              </Grid>
            ))}
          </>
        ) : (
          <>
            {forms?.map((el: Form) => (
              <Grid key={el.id} item xs={6} sm={6} md={4} lg={3}>
                <FormCard
                  onDelete={onDelete}
                  formId={el.id}
                  image={el.image_url}
                  title={el.title}
                  openDateTime={el?.opened_at}
                />
              </Grid>
            ))}
            {isFetching && !!forms?.length && (
              <div style={{ width: '100%', textAlign: 'center', padding: '32px' }}>
                <CircularProgress color="primary" />
              </div>
            )}
          </>
        )}
        {!isFetching && data?.has_next && <div ref={ref} style={{ width: '100%' }} />}
      </Grid>
    </section>
  );
};

FormList.displayName = 'FormList';

export default FormList;
