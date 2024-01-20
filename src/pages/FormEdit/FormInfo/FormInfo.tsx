import { useParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import useFormRequest from '@/api/form/useFormRequest';

import * as classNames from 'classnames/bind';
import style from './FormInfo.module.scss';
const cx = classNames.bind(style);

export interface FormInfoProps {}

const FormInfo = (props: FormInfoProps) => {
  const { formId } = useParams();
  const { form } = useFormRequest(formId, { revalidateOnMount: false });

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        {form?.title || 'Untitled Form'}
      </Typography>
      {form?.description && <Typography>{form?.description}</Typography>}
    </>
  );
};

FormInfo.displayName = 'FormInfo';

export default FormInfo;
