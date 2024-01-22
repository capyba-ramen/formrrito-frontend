import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import FormCard from '@/components/FormCard/FormCard';
import SkeletonFormCard from '@/components/FormCard/SkeletonFormCard';
import * as React from 'react';
import { ImageUrl } from '@/constants/form';
import useFormsRequest from '@/api/form/useFormsRequest';
import { Form } from '@/types/form';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

import * as classNames from 'classnames/bind';
import style from './FormList.module.scss';
const cx = classNames.bind(style);

const FormList = () => {
  const { data, isFetching } = useFormsRequest({ start: '1', size: '10', sort: 'desc' });
  const ref = React.useRef(null);
  useIntersectionObserver(ref, (entry) => {
    const isVisible = !!entry?.isIntersecting;
    if (isVisible) {
      console.log('isVisible');
    }
  });

  return (
    <section className={cx('root')}>
      <Typography sx={{ marginBottom: '16px', fontWeight: 700 }}>Recent Forms</Typography>

      <Grid container spacing={2}>
        {isFetching ? (
          <>
            {Array.from(new Array(6)).map((_, idx) => (
              <Grid key={idx} item xs={6} sm={6} md={4} lg={3}>
                <SkeletonFormCard />
              </Grid>
            ))}
          </>
        ) : (
          data?.result?.map((el: Form) => (
            <Grid key={el.id} item xs={6} sm={6} md={4} lg={3}>
              <FormCard formId={el.id} image={ImageUrl[el.image_url]} title={el.title} openDateTime={el?.opened_at} />
            </Grid>
          ))
        )}
      </Grid>
    </section>
  );
};

FormList.displayName = 'FormList';

export default FormList;
