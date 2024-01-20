import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import FormCard from '@/components/FormCard/FormCard';
import ImageSrc4 from '@/assets/images/4.png';

import useFormsRequest from '@/api/form/useFormsRequest';
import { Form } from '@/types/form';

import * as classNames from 'classnames/bind';
import style from './FormList.module.scss';
const cx = classNames.bind(style);

const FormList = () => {
  const { forms, isFetching } = useFormsRequest();

  return (
    <section className={cx('root')}>
      <Typography sx={{ marginBottom: '16px', fontWeight: 700 }}>Recent Forms</Typography>
      {isFetching ? (
        'is loading...'
      ) : (
        <Grid container spacing={2}>
          {forms?.map((form: Form) => (
            <Grid key={form.id} item xs={6} sm={6} md={4} lg={3}>
              <FormCard formId={form.id} image={ImageSrc4} title={form.title} openDateTime={form?.opened_at} />
            </Grid>
          ))}
        </Grid>
      )}
    </section>
  );
};

FormList.displayName = 'FormList';

export default FormList;
