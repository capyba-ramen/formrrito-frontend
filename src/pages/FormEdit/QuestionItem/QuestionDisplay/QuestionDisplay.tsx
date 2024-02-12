import { useFormContext, useWatch } from 'react-hook-form';

import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { QuestionTypeEnum } from '@/constants/question';
import ImageDisplay from '../ImageDisplay/ImageDisplay';

export interface QuestionDisplayProps {
  qId: string;
  index: number;
}

const QuestionDisplay = (props: QuestionDisplayProps) => {
  const { qId, index } = props;
  const { getValues } = useFormContext();
  const watchType = useWatch({ name: `questions.${index}.type` });

  const renderOptions = () => {
    switch (watchType) {
      case QuestionTypeEnum.SIMPLE:
        return <div>Short Answer Text</div>;
      case QuestionTypeEnum.COMPLEX:
        return <div>Long Answer Text</div>;
      case QuestionTypeEnum.SINGLE:
        return (
          <RadioGroup>
            {getValues(`questions.${index}.options`)?.map((el, idx) => (
              <FormControlLabel value={idx} key={`${qId}-${idx}`} control={<Radio />} label={el.title} />
            ))}
          </RadioGroup>
        );
      case QuestionTypeEnum.MULTIPLE:
        return (
          <FormGroup>
            {getValues(`questions.${index}.options`)?.map((el, idx) => (
              <FormControlLabel key={`${qId}-${idx}`} value={idx} control={<Checkbox />} label={el.title} />
            ))}
          </FormGroup>
        );
      case QuestionTypeEnum.DROP_DOWN:
        return (
          <ol>
            {getValues(`questions.${index}.options`)?.map((el, idx) => <li key={`${qId}-${idx}`}>{el.title}</li>)}
          </ol>
        );
      default:
        return undefined;
    }
  };

  return (
    <div>
      <Typography variant="subtitle1" fontWeight={700}>
        {getValues(`questions.${index}.required`) && <span style={{ color: 'var(--red-1)' }}>*</span>}{' '}
        {`${index + 1}. ${getValues(`questions.${index}.title`) || `Question ${index + 1}`}`}
      </Typography>
      <ImageDisplay index={index} />
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
