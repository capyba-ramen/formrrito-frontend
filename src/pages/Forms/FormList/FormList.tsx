import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import FormCard from '../../../components/FormCard/FormCard';
import ImageSrc1 from '../../../assets/images/1.png';
import ImageSrc2 from '../../../assets/images/2.png';
import ImageSrc3 from '../../../assets/images/3.png';
import ImageSrc4 from '../../../assets/images/4.png';
import ImageSrc5 from '../../../assets/images/5.png';
import ImageSrc6 from '../../../assets/images/6.png';

import * as classNames from 'classnames/bind';
import style from './FormList.module.scss';
const cx = classNames.bind(style);

const FormList = () => {
  return (
    <section className={cx('root')}>
      <Typography sx={{ marginBottom: '16px' }}>Recent Forms</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={4} lg={3}>
          <FormCard image={ImageSrc1} title="Form 1" openDateTime="2024.01.23" formId="1" />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3}>
          <FormCard image={ImageSrc2} title="Form 2" openDateTime="2024.01.23" formId="2" />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3}>
          <FormCard image={ImageSrc3} title="Form 3" openDateTime="2024.01.23" formId="3" />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3}>
          <FormCard image={ImageSrc4} title="Form 4" openDateTime="2024.01.23" formId="4" />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3}>
          <FormCard image={ImageSrc5} title="Form 5" openDateTime="2024.01.23" formId="5" />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3}>
          <FormCard image={ImageSrc6} title="Form 6" openDateTime="2024.01.23" formId="6" />
        </Grid>
      </Grid>
    </section>
  );
};

FormList.displayName = 'FormList';

export default FormList;
