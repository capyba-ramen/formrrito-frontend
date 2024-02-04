import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import useCreateTemplateForm from '@/api/form/useCreateTemplateForm';
import useFormsRequest from '@/api/form/useFormsRequest';

import * as classNames from 'classnames/bind';
import style from './TemplateItem.module.scss';
const cx = classNames.bind(style);

export interface TemplateItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image?: string;
  title?: string;
  type: string;
}

const TemplateItem = (props: TemplateItemProps) => {
  const { image, title, type, ...other } = props;
  const { trigger: createTemplateForm } = useCreateTemplateForm();
  const navigate = useNavigate();
  const { mutate } = useFormsRequest({ start: '1', size: '12', sort: 'desc' });

  const handleCreateTemplate = () => {
    createTemplateForm({
      template: type,
    }).then((res) => {
      if (res) {
        navigate(`/form/${res.data.form_id}`);
        mutate();
      }
    });
  };

  return (
    <div className={cx('root')} {...other} onClick={handleCreateTemplate}>
      <div className={cx('image')}>
        <img src={image} alt={`template-${title}`} />
      </div>
      <Typography variant="body2" align="center">
        {title}
      </Typography>
    </div>
  );
};

TemplateItem.displayName = 'TemplateItem';

export default TemplateItem;
