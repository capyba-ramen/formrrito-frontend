import { useParams, useNavigate } from 'react-router-dom';

import PurritoInfo from '@/components/PurritoInfo/PurritoInfo';

const FormSubmitted = () => {
  const formId = useParams()?.formId || '';
  const navigate = useNavigate();

  return (
    <PurritoInfo
      title="Form Submitted Successfully!"
      btnText="Submit Another Response"
      onBtnClick={() => navigate(`/c-form/${formId}`)}
    />
  );
};

FormSubmitted.displayName = 'FormSubmitted';

export default FormSubmitted;
