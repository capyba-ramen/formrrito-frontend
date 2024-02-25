import { useWatch } from 'react-hook-form';
import AddOption from '../AddOption/AddOption';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Option from '../Option/Option';
import { QuestionTypeEnum } from '@/constants/question';
import { OptionField } from '@/types/option';

import * as classNames from 'classnames/bind';
import style from './Options.module.scss';
const cx = classNames.bind(style);

export interface OptionsProps {
  append: (option: OptionField) => void;
  remove: (index: number) => void;
  options: OptionField & { id: string }[];
  index: number;
}

const Options = (props: OptionsProps) => {
  const { append, remove, options, index } = props;
  const watchType = useWatch({ name: `questions.${index}.type` });

  switch (watchType) {
    case QuestionTypeEnum.SIMPLE:
      return <Typography color="var(--gray-3)">ShortAnswer</Typography>;
    case QuestionTypeEnum.COMPLEX:
      return <Typography color="var(--gray-3)">Paragraph</Typography>;
    case QuestionTypeEnum.SINGLE:
      return (
        <>
          <div className={cx('root')}>
            {options?.map((el, idx) => (
              <Option
                key={el.id}
                name={`questions.${index}.options.${idx}.title`}
                prefix={<Radio />}
                onRemove={() => {
                  remove(idx);
                }}
              />
            ))}
          </div>
          <AddOption index={index} append={append} />
        </>
      );
    case QuestionTypeEnum.MULTIPLE:
      return (
        <>
          <div className={cx('root')}>
            {options?.map((el, idx) => (
              <Option
                key={el.id}
                name={`questions.${index}.options.${idx}.title`}
                prefix={<Checkbox />}
                onRemove={() => {
                  remove(idx);
                }}
              />
            ))}
          </div>
          <AddOption index={index} append={append} />
        </>
      );
    case QuestionTypeEnum.DROP_DOWN:
      return (
        <>
          <div className={cx('root')}>
            {options?.map((el, idx) => (
              <Option
                key={el.id}
                name={`questions.${index}.options.${idx}.title`}
                prefix={
                  <Typography variant="subtitle1" component="p">
                    {idx + 1}. &nbsp;&nbsp;
                  </Typography>
                }
                onRemove={() => {
                  remove(idx);
                }}
              />
            ))}
          </div>
          <AddOption index={index} append={append} />
        </>
      );
    default:
      return undefined;
  }
};

Options.displayName = 'Options';

export default Options;
