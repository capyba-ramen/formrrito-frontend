import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import useApiErrorHandlers from '@/api/useApiErrorsHandler';
import useFormRequest from '@/api/form/useFormRequest';
import Questions from './Questions';
import { Question } from '@/types/question';

const QuestionsContainer = () => {
  const formId = useParams().formId || '';
  const method = useFormContext();
  const { reset } = method;
  const { data, error } = useFormRequest(formId, {
    revalidateOnMount: false,
  });
  const { errorsHandler } = useApiErrorHandlers();

  React.useEffect(() => {
    if (!error) return;

    errorsHandler(error);
  }, [error, errorsHandler]);

  React.useEffect(() => {
    if (!data) return;

    reset((formValues) => ({
      ...formValues,
      questions: data?.questions?.map((q: Question) => ({
        qId: q.id,
        type: q.type,
        title: q.title,
        description: q.description,
        required: q.is_required,
        options: q.options?.map((el) => ({
          optionId: el.id,
          title: el.title,
        })),
        imageUrl: q.image_url,
      })),
    }));
  }, [data]);

  return <Questions />;
};

QuestionsContainer.displayName = 'QuestionsContainer';

export default QuestionsContainer;
