import * as React from 'react';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import Tooltip from '@mui/material/Tooltip';
import { generateQueryString } from '@/utils/queryString';

import FormCard from '@/components/FormCard/FormCard';
import SkeletonFormCard from '@/components/FormCard/SkeletonFormCard';
import useOnScreen from '@/hooks/useOnScreen';
import { Form } from '@/types/form';
import { getFetcher } from '@/api/fetchers';

import * as classNames from 'classnames/bind';
import style from './FormList.module.scss';
const cx = classNames.bind(style);

type FormListApiData = {
  count: number;
  has_next: boolean;
  limit: number;
  offset: number;
  result: Form[];
  next: number;
};

const FormList = () => {
  const [sortDesc, setSortDesc] = React.useState(true);
  const getKey: SWRInfiniteKeyLoader = (_, previousPageData: FormListApiData | null) => {
    const url = `/api/form/list${generateQueryString({
      start: previousPageData?.next?.toString() || '1',
      size: '12',
      sort: sortDesc ? 'desc' : 'asc',
    })}`;

    return url;
  };

  const { data, mutate, size, setSize, isValidating, isLoading } = useSWRInfinite<
    FormListApiData,
    unknown,
    SWRInfiniteKeyLoader
  >(getKey, getFetcher, {
    revalidateFirstPage: false,
    revalidateAll: false,
  });
  const ref = React.useRef(null);
  const forms = data?.map((el) => el?.result);
  const isEmpty = !forms?.[0]?.length;
  const isVisible = useOnScreen(ref);

  React.useEffect(() => {
    if (isVisible && data && !isLoading && !isValidating && data?.[size - 1]?.has_next) {
      setSize((prev) => prev + 1);
    }
  }, [isVisible, data]);

  const handleSortClick = () => {
    setSortDesc((prev) => !prev);
  };

  const onDelete = () => {
    mutate();
  };

  return (
    <section className={cx('root')}>
      <div className={cx('title')}>
        <Typography fontWeight={700}>Recent Forms</Typography>
        {!isEmpty && (
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
              onClick={handleSortClick}
            >
              Sort
            </Button>
          </Tooltip>
        )}
      </div>
      <Grid container spacing={2}>
        {isEmpty ? (
          <>
            {isLoading || isValidating ? (
              <>
                {Array.from(new Array(6)).map((_, idx) => (
                  <Grid key={idx} item xs={6} sm={6} md={4} lg={3}>
                    <SkeletonFormCard />
                  </Grid>
                ))}
              </>
            ) : (
              <Grid item xs={12} sx={{ margin: '36px' }}>
                <Typography variant="body1" color="var(--gray-3)" align="center">
                  No forms found
                </Typography>
              </Grid>
            )}
          </>
        ) : (
          <>
            {forms?.map((res) =>
              res.map((el: Form) => (
                <Grid key={el.id} item xs={6} sm={6} md={4} lg={3}>
                  <FormCard
                    onDelete={onDelete}
                    formId={el.id}
                    image={`${import.meta.env.VITE_CDN_PATH}${el.image_url}`}
                    title={el.title}
                    openDateTime={el?.opened_at}
                  />
                </Grid>
              ))
            )}
            {(isLoading || isValidating) && !isEmpty && (
              <div style={{ width: '100%', textAlign: 'center', padding: '32px' }}>
                <CircularProgress color="primary" />
              </div>
            )}
          </>
        )}
        <div ref={ref} style={{ height: '5px', background: 'blue' }} />
      </Grid>
    </section>
  );
};

FormList.displayName = 'FormList';

export default FormList;
