import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import FormTabs from './FormTabs/FormTabs';
import FormInfo from './FormInfo/FormInfo';
import FormWrapper from '@/components/FormWrapper/FormWrapper';
import QuestionsContainer from './Questions/QuestionsContainer';
import Responses from './Responses/Responses';
import useFormRequest from '@/api/form/useFormRequest';
import PageSkeleton from '@/components/PageSkeleton/PageSkeleton';

const FormEdit = () => {
  const formId = useParams()?.formId || '';
  const { data, isFetching } = useFormRequest(formId);
  const location = useLocation();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      acceptsReply: true,
      imageUrl: '',
      questions: [],
    },
  });
  const { reset } = methods;

  React.useEffect(() => {
    if (!data) return;

    reset((formValues) => ({
      ...formValues,
      title: data?.title || 'Untitled Form',
      description: data?.description || 'Form description',
      imageUrl: data?.image_url,
    }));
  }, [data]);

  return (
    <FormProvider {...methods}>
      {isFetching ? (
        <PageSkeleton />
      ) : (
        <>
          <FormInfo />
          <FormTabs />
          <FormWrapper style={{ marginTop: '24px' }}>
            {location.hash !== '#responses' ? <QuestionsContainer /> : <Responses />}
          </FormWrapper>
        </>
      )}
    </FormProvider>
  );
};

FormEdit.displayName = 'FormEdit';

export default FormEdit;
