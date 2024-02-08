import { useFormContext, Controller } from 'react-hook-form';
import Typography from '@mui/material/Typography';

import { Question } from '@/types/question';
import { QuestionTypeEnum } from '@/constants/question';
import FormField from '@/components/FormField/FormField';

import * as classNames from 'classnames/bind';
import style from './FormFieldWrapper.module.scss';
const cx = classNames.bind(style);

export interface FormFieldWrapperProps {
  type: Question['type'];
  options: Question['options'];
  title: Question['title'];
  description: Question['description'];
  is_required: Question['is_required'];
  index: number;
}

const FormFieldWrapper = (props: FormFieldWrapperProps) => {
  const { type, options, title, description, is_required, index } = props;
  const { control } = useFormContext();

  return (
    <div className={cx('root')}>
      <Typography variant="body1" fontWeight={500} gutterBottom>
        {is_required && <span style={{ color: 'var(--red-1)' }}>*</span>}{' '}
        {`${index + 1}. ${title || `Question ${index + 1}`}`}
      </Typography>
      {description && (
        <Typography variant="body2" color="var(--gray-3)" gutterBottom>
          {description}
        </Typography>
      )}
      <Controller
        control={control}
        name={`replies.${index}`}
        rules={{
          validate: {
            ...(is_required
              ? {
                  required: (v) => {
                    switch (type) {
                      case QuestionTypeEnum.SIMPLE:
                      case QuestionTypeEnum.COMPLEX:
                      case QuestionTypeEnum.DROP_DOWN:
                      case QuestionTypeEnum.SINGLE:
                        return !!v?.value || 'required!';
                      case QuestionTypeEnum.MULTIPLE:
                        return !!v?.value?.length || 'required!';
                      default:
                        return true;
                    }
                  },
                }
              : {}),
          },
        }}
        render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
          const handleChange = (value: any, type: Question['type']) => (e) => {
            switch (type) {
              case QuestionTypeEnum.MULTIPLE:
                return onChange({
                  ...value,
                  value: e.target.checked
                    ? [...(value?.value || []), e.target.name]
                    : value?.value?.filter((v) => v !== e.target.name),
                });
              case QuestionTypeEnum.SINGLE:
              case QuestionTypeEnum.DROP_DOWN:
              default:
                return onChange({
                  ...value,
                  value: e.target.value,
                });
            }
          };
          return (
            <FormField
              required={is_required}
              type={type}
              options={options}
              onChange={handleChange(value, type)}
              value={value?.value}
              ref={ref}
              helperText={error?.message}
              error={!!error?.type}
            />
          );
        }}
      />
    </div>
  );
};

FormFieldWrapper.displayName = 'FormFieldWrapper';

export default FormFieldWrapper;
