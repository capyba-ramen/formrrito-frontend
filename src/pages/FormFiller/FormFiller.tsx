import * as React from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import FormWrapper from '@/components/FormWrapper/FormWrapper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useCFormRequest from '@/api/form/useCFormRequest';
import { Question } from '@/types/question';
import { ReplyField } from '@/types/reply';
import { ImageUrl, ImageUrlType } from '@/constants/form';
import FormFieldWrapper from '@/components/FormFieldWrapper/FormFieldWrapper';
import useApiErrorHandlers from '@/api/useApiErrorsHandler';
import useSubmitCForm from '@/api/form/useSubmitCForm';
import useNotification from '@/components/NotificationProvider/useNotification';
import PageSkeleton from '@/components/PageSkeleton/PageSkeleton';

import { QuestionTypeEnum } from '@/constants/question';

import * as classNames from 'classnames/bind';
import style from './FormFiller.module.scss';
const cx = classNames.bind(style);

const FormFiller = () => {
  const formId = useParams()?.formId || '';
  const { data, error, isFetching } = useCFormRequest(formId);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      replies: [],
    },
  });
  const { reset, handleSubmit } = methods;
  const { errorsHandler } = useApiErrorHandlers();
  const { trigger: submitCForm } = useSubmitCForm();
  const { addNotification, openDialog } = useNotification();
  const { fields } = useFieldArray({
    control: methods.control,
    name: 'replies',
  });

  React.useEffect(() => {
    if (!error) return;

    errorsHandler(error);
  }, [error, errorsHandler]);

  const transformValue = (type: Question['type'], options: Question['options']) => {
    switch (type) {
      case QuestionTypeEnum.SIMPLE:
      case QuestionTypeEnum.COMPLEX:
      case QuestionTypeEnum.SINGLE:
        return '';
      case QuestionTypeEnum.DROP_DOWN:
        return options?.[0]?.id || '';
      case QuestionTypeEnum.MULTIPLE:
        return [];
    }
  };

  const composeValue = (type: Question['type'], value: any, qId: string) => {
    switch (type) {
      case QuestionTypeEnum.SIMPLE:
      case QuestionTypeEnum.COMPLEX:
        return {
          answer: value,
        };
      case QuestionTypeEnum.SINGLE:
      case QuestionTypeEnum.DROP_DOWN:
        return {
          option_ids: value ? [value] : [],
          option_titles: value
            ? [data?.questions?.find((q) => q.id === qId)?.options?.find((op) => op.id === value)?.title]
            : [],
        };
      case QuestionTypeEnum.MULTIPLE:
        return {
          option_ids: value,
          option_titles: value.map(
            (o: string) => data?.questions?.find((q) => q.id === qId)?.options?.find((op) => op.id === o)?.title
          ),
        };
    }
  };

  React.useEffect(() => {
    if (!data) return;

    if (!data.accepts_reply) {
      openDialog({
        title: 'Not Available',
        content: "Oops! It seems that this form doesn't accept replies.",
        onConfirm: () => {
          window.location.href = '/forms';
        },
        confirmBtnText: 'Go To Homepage',
        isCloseableByOutside: false,
      });
      return;
    }

    reset({
      replies: data.questions?.map((q: Question) => ({
        ...q,
        question_id: q.id,
        value: transformValue(q.type, q.options),
      })) as ReplyField[],
    });
  }, [data]);

  const onSubmit = handleSubmit((formData) => {
    submitCForm({
      formId: formId,
      replies: formData.replies.map((r: ReplyField) => ({
        question_id: r.question_id,
        question_type: r.type,
        ...composeValue(r.type, r.value, r.question_id),
      })),
    })
      .then(() => {
        addNotification({
          message: 'Submit successfully',
        });
      })
      .catch(() => {
        addNotification({
          message: 'Submit failed',
        });
      });
  });

  const onClear = () => {
    reset();
  };

  return (
    <FormProvider {...methods}>
      {isFetching ? (
        <PageSkeleton />
      ) : (
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
            {fields?.map((r: ReplyField, index: number) => (
              <FormFieldWrapper
                key={r.id}
                index={index}
                type={r.type}
                options={r.options}
                title={r.title}
                description={r.description}
                is_required={r.is_required}
              />
            ))}
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
      )}
    </FormProvider>
  );
};

FormFiller.displayName = 'FormFiller';

export default FormFiller;
