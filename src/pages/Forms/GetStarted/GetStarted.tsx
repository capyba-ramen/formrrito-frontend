import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import useCreateForm from '@/api/form/useCreateForm';
import { TemplateForms } from '@/constants/form';
import TemplateItem from '@/components/TemplateItem/TemplateItem';
import useFormsRequest from '@/api/form/useFormsRequest';

import * as classNames from 'classnames/bind';
import style from './GetStarted.module.scss';
const cx = classNames.bind(style);

const GetStarted = () => {
  const { trigger: postCreateForm } = useCreateForm();
  const navigate = useNavigate();
  const { mutate } = useFormsRequest({ start: '1', size: '12', sort: 'desc' });

  const handleCreateForm = () => {
    postCreateForm().then((res) => {
      if (res) {
        navigate(`/form/${res.data.form_id}`);
        mutate();
      }
    });
  };

  return (
    <section className={cx('root')}>
      <Typography variant="h6" fontWeight={700} gutterBottom>
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
            <Typography variant="body1" fontWeight={600}>
              Create New Form
            </Typography>
            <Typography variant="body2" color="var(--gray-3)">
              Blank Form
            </Typography>
          </div>
        </Paper>
        <Paper elevation={0} className={cx('paper', 'templates-showcase')}>
          <div style={{ marginRight: '36px', whiteSpace: 'nowrap' }}>
            <Typography variant="body1" fontWeight={600}>
              Use Popular Templates
            </Typography>
            <Typography variant="body2" color="var(--gray-3)">
              Blank Form
            </Typography>
          </div>
          <Grid wrap="nowrap" container spacing={2}>
            {TemplateForms.map((el) => (
              <Grid item key={el.type}>
                <TemplateItem title={el.title} image={el.image} type={el.type} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </div>
    </section>
  );
};

GetStarted.displayName = 'GetStarted';

export default GetStarted;
