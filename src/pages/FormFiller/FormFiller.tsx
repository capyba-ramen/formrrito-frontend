import * as React from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import FormWrapper from '@/components/FormWrapper/FormWrapper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useCFormRequest from '@/api/form/useCFormRequest';
import { Question } from '@/types/question';
import { ReplyField } from '@/types/reply';
import { ImageUrl, ImageUrlType } from '@/constants/form';
import FormFieldWrapper from '@/components/FormFieldWrapper/FormFieldWrapper';
import useErrorsHandler from '@/hooks/useErrorsHandler';
import useSubmitCForm from '@/api/form/useSubmitCForm';
import useNotification from '@/components/NotificationProvider/useNotification';

import * as classNames from 'classnames/bind';
import style from './FormFiller.module.scss';
const cx = classNames.bind(style);

const FormFiller = () => {
  const formId = useParams()?.formId || '';
  const { data, error } = useCFormRequest(formId);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      replies: [],
    },
  });
  const { reset, handleSubmit } = methods;
  const { errorsHandler } = useErrorsHandler();
  const { trigger: submitCForm } = useSubmitCForm(formId);
  const { addNotification } = useNotification();

  React.useEffect(() => {
    if (!error) return;

    errorsHandler(error);
  }, [error, errorsHandler]);

  React.useEffect(() => {
    // TODO: handle not accepts_reply
    if (!data?.accepts_reply) return;

    reset({
      replies: data?.questions?.map((q: Question) => ({
        questionId: q.id,
        questionType: q.type,
        options: [],
        answer: '',
      })),
    });
  }, [data]);

  const onSubmit = handleSubmit((formData) => {
    console.log({
      replies: formData.replies.map((r: ReplyField) => ({
        question_id: r.questionId,
        question_type: r.questionType,
        option_ids: r.options,
        title_ids: r.options.map(
          (o: string) => data?.questions?.find((q) => q.id === r.questionId)?.options?.find((op) => op.id === o)?.title
        ),
        answer: r.answer,
      })),
    });

    // submitCForm({
    //   replies: formData.replies.map((r: ReplyField) => ({
    //     question_id: r.questionId,
    //     question_type: r.questionType,
    //     option_ids: r.options,
    //     title_ids: r.options.map(
    //       (o: string) => data?.questions?.find((q) => q.id === r.questionId)?.options?.find((op) => op.id === o)?.title
    //     ),
    //     answer: r.answer,
    //   }))
    // })
    //   .then(() => {
    //     addNotification({
    //       message: 'Submit successfully',
    //     });
    //   })
    //   .catch(() => {
    //     addNotification({
    //       message:'Submit failed'
    //     });
  });

  const onClear = () => {
    reset();
  };

  return (
    <FormProvider {...methods}>
      <FormWrapper style={{ marginTop: '24px' }}>
        <div className={cx('banner')}>
          <img src={ImageUrl[data?.image_url as keyof ImageUrlType]} alt="form-banner" />
        </div>
        <Typography variant="h5" fontWeight={600}>
          {data?.title || 'Untitled Form'}
        </Typography>
        {data?.description && (
          <Typography variant="subtitle1" color="var(--gray-3)">
            {data.description}
          </Typography>
        )}
        <div className={cx('questions')}>
          {data?.questions?.map((q: Question, index: number) => <FormFieldWrapper key={q.id} index={index} {...q} />)}
        </div>
        <div className={cx('actions')}>
          <Button variant="outlined" color="primary" sx={{ marginRight: '8px', minWidth: '160px' }} onClick={onClear}>
            Clear Form
          </Button>
          <Button variant="contained" color="primary" sx={{ minWidth: '160px' }} onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </FormWrapper>
    </FormProvider>
  );
};

FormFiller.displayName = 'FormFiller';

export default FormFiller;
