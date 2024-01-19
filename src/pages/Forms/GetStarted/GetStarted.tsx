import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import useCreateForm from '../../../api/hooks/useCreateForm';

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
  const { trigger: postCreateForm } = useCreateForm();
  const navigate = useNavigate();
  const handleCreateForm = () => {
    postCreateForm().then((res) => {
      if (res) {
        navigate(`/form/${res.data.form_id}`);
      }
    });
  };

  return (
    <section className={cx('root')}>
      <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 700 }}>
        Get Started With Formrrito!
      </Typography>
      <div className={cx('container')}>
        <Paper
          elevation={0}
          className={cx('paper', 'create-new')}
          onClick={handleCreateForm}
          sx={{ transition: 'transform 0.2s' }}
        >
          <div>
            <div style={{ textAlign: 'center' }}>
              <IconButton
                size="small"
                classes={{
                  root: cx('icon-button'),
                }}
                aria-label="add blank form"
              >
                <AddIcon />
              </IconButton>
            </div>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Create New Form
            </Typography>
            <Typography variant="body2" color="var(--gray-3)">
              Blank Form
            </Typography>
          </div>
        </Paper>
        <Paper elevation={0} className={cx('paper', 'templates-showcase')}>
          <div style={{ marginRight: '36px', whiteSpace: 'nowrap' }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Use Popular Templates
            </Typography>
            <Typography variant="body2" color="var(--gray-3)">
              Blank Form
            </Typography>
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
