import * as React from 'react';
import { FormProvider, useForm, useFieldArray, FieldArrayWithId } from 'react-hook-form';
import { useParams, useLocation } from 'react-router-dom';

import FormTabs from './FormTabs/FormTabs';
import FormInfo from './FormInfo/FormInfo';
import FormWrapper from '@/components/FormWrapper/FormWrapper';
import AddQuestionButton from './AddQuestionButton/AddQuestionButton';
import Questions from './Questions/Questions';
import Responses from './Responses/Responses';
import useErrorsHandler from '@/hooks/useErrorsHandler';
import useFormRequest from '@/api/form/useFormRequest';
import { Question, QuestionField } from '@/types/question';
import { FormValues } from '@/types/form';

const FormEdit = () => {
  const [activeQuestionId, setActiveQuestionId] = React.useState<string | undefined>(undefined);
  const [errorQuestionId, setErrorQuestionId] = React.useState<string | undefined>(undefined);
  const formId = useParams()?.formId || '';
  const { form, error } = useFormRequest(formId);
  const { errorsHandler } = useErrorsHandler();
  const location = useLocation();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      acceptResponse: true,
      imageUrl: '',
      questions: [],
    },
  });

  const { reset, control } = methods;
  const { append, fields, swap } = useFieldArray<FormValues, 'questions'>({
    control,
    name: 'questions',
  });

  React.useEffect(() => {
    if (!error) return;

    errorsHandler(error);
  }, [error, errorsHandler]);

  React.useEffect(() => {
    if (!form) return;

    reset({
      title: form?.title || 'Untitled Form',
      description: form?.description || 'Form description',
      acceptResponse: form?.accept_responses,
      imageUrl: form?.image_url,
      questions: form?.questions?.map((q: Question) => ({
        qId: q.id,
        type: q.type,
        title: q.title,
        description: q.description,
        required: q.is_required,
        options: q.options?.map((el) => ({
          optionId: el.id,
          title: el.title,
        })),
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
            <Questions
              questions={fields as (QuestionField & FieldArrayWithId)[]}
              activeQuestionId={activeQuestionId}
              onSetActiveQuestionId={setActiveQuestionId}
              errorQuestionId={errorQuestionId}
              onSetErrorQuestionId={setErrorQuestionId}
              onSwap={swap}
            />
            <AddQuestionButton sx={{ marginTop: '16px' }} append={append} setActiveQuestionId={setActiveQuestionId} />
          </>
        ) : (
          <Responses />
        )}
      </FormWrapper>
    </FormProvider>
  );
};

FormEdit.displayName = 'FormEdit';

export default FormEdit;
