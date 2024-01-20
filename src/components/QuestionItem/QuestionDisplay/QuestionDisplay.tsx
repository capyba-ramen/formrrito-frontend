import * as React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { Question } from '@/types/question';

import * as classNames from 'classnames/bind';
import style from './QuestionDisplay.module.scss';
const cx = classNames.bind(style);

export interface QuestionDisplayProps {
  qId: string;
  index: number;
  onSetActiveQId: (qId?: Question['id']) => void;
}

const QuestionDisplay = (props: QuestionDisplayProps) => {
  const { qId, index, onSetActiveQId } = props;
  const { getValues } = useFormContext();
  const watchType = useWatch({ name: `questions.${index}.type` }); // TODO: use
  const handleClick = () => {
    onSetActiveQId(qId);
  };

  const renderOptions = React.useCallback(() => {
    switch (watchType) {
      case 0:
        return <div>Short Answer</div>;
      case 1:
        return <div>Long Answer Text</div>;
      case 2:
      case 4:
        return (
          <RadioGroup>
            {getValues(`questions.${index}.options`)?.map((el) => (
              <FormControlLabel value={el.id} key={`${qId}-${el.id}`} control={<Radio />} label={el.title} />
            ))}
          </RadioGroup>
        );
      case 3:
        return (
          <FormGroup>
            {getValues(`questions.${index}.options`)?.map((el) => (
              <FormControlLabel key={`${qId}-${el.id}`} control={<Checkbox />} label={el.title} />
            ))}
          </FormGroup>
        );
      default:
        return undefined;
    }
  }, []);

  return (
    <div className={cx('root')} onClick={handleClick}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        {getValues(`questions.${index}.title`) || `Question ${index + 1}`}
      </Typography>
      {getValues(`questions.${index}.description`) && (
        <Typography variant="subtitle2" color="var(--gray-3)">
          {getValues(`questions.${index}.description`)}
        </Typography>
      )}
      <Divider sx={{ margin: '12px 0' }} />
      {renderOptions()}
    </div>
  );
};

QuestionDisplay.displayName = 'QuestionDisplay';

export default QuestionDisplay;
