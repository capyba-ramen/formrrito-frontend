import * as React from 'react';
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';
import { useParams, useLocation } from 'react-router-dom';

import FormTabs from './FormTabs/FormTabs';
import FormInfo from './FormInfo/FormInfo';
import FormWrapper from '@/components/FormWrapper/FormWrapper';
import AddQuestionButton from './AddQuestionButton/AddQuestionButton';
import Questions from './Questions/Questions';

import useFormRequest from '@/api/form/useFormRequest';
import { Question } from '@/types/question';

const FormEdit = () => {
  const { formId } = useParams();
  const { form } = useFormRequest(formId);
  const location = useLocation();
  console.log(location.hash);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: { questions: [] },
  });

  const { reset, control } = methods;
  const { append, fields } = useFieldArray({
    control,
    name: 'questions',
  });

  React.useEffect(() => {
    if (!form) return;

    reset({
      questions: form?.questions?.map((q: Question) => ({
        qId: q.id,
        type: q.type,
        title: q.title,
        description: q.description,
        required: q.is_required,
        options: q.options,
      })),
    });
  }, [form]);

  return (
    <FormProvider {...methods}>
      <FormInfo />
      <FormTabs />
      <FormWrapper style={{ marginTop: '24px' }}>
        {location.hash !== '#responses' ? (
          <>
            <Questions questions={fields} />
            <AddQuestionButton sx={{ marginTop: '16px' }} append={append} />
          </>
        ) : (
          <div>
            Responses
            <h1>Charts</h1>
          </div>
        )}
      </FormWrapper>
    </FormProvider>
  );
};

FormEdit.displayName = 'FormEdit';

export default FormEdit;
