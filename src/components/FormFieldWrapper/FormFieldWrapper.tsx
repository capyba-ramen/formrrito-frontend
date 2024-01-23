import { useFormContext, Controller } from 'react-hook-form';
import Typography from '@mui/material/Typography';

import { Question } from '@/types/question';
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
        {title ? `${index + 1}. ${title}` : `Question ${index + 1}`}
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
          validate: (value) => {
            if (is_required && (!value?.answer || !value?.option_id || !value?.option_title))
              return 'This field is required';
          },
        }}
        render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
          <FormField type={type} options={options} onChange={onChange} value={value} ref={ref} error={error} />
        )}
      />
    </div>
  );
};

FormFieldWrapper.displayName = 'FormFieldWrapper';

export default FormFieldWrapper;
