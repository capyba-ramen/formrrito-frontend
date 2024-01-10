import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';

import TemplateItem from '../../../components/TemplateItem/TemplateItem';
import ImageSrc1 from '../../../assets/images/1.png';
import ImageSrc2 from '../../../assets/images/2.png';
import ImageSrc3 from '../../../assets/images/3.png';
import ImageSrc4 from '../../../assets/images/4.png';
import ImageSrc5 from '../../../assets/images/5.png';

import * as classNames from 'classnames/bind';
import style from './GetStarted.module.scss';
const cx = classNames.bind(style);

const GetStarted = () => {
  return (
    <section className={cx('root')}>
      <Typography sx={{ marginBottom: '20px' }}>Get Started With Formrrito!</Typography>
      <div className={cx('container')}>
        <Paper elevation={0} className={cx('paper', 'create-new')} sx={{ marginRight: '16px', whiteSpace: 'nowrap' }}>
          <div>
            <IconButton color="primary" aria-label="add blank form">
              <AddIcon />
            </IconButton>
            <Typography>Create New Form</Typography>
            <Typography>Blank Form</Typography>
          </div>
        </Paper>
        <Paper elevation={0} className={cx('paper', 'templates-showcase')}>
          <div style={{ marginRight: '36px', whiteSpace: 'nowrap' }}>
            <Typography>Use Popular Templates</Typography>
            <Typography>Blank Form</Typography>
          </div>
          <Grid wrap="nowrap" container spacing={2}>
            <Grid item>
              <TemplateItem title="Party Invite" image={ImageSrc5} />
            </Grid>
            <Grid item>
              <TemplateItem title="Contact Information" image={ImageSrc2} />
            </Grid>
            <Grid item>
              <TemplateItem title="Event Registration" image={ImageSrc1} />
            </Grid>
            <Grid item>
              <TemplateItem title="RSVP" image={ImageSrc3} />
            </Grid>
            <Grid item>
              <TemplateItem title="Customer Feedback" image={ImageSrc4} />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </section>
  );
};

GetStarted.displayName = 'GetStarted';

export default GetStarted;
