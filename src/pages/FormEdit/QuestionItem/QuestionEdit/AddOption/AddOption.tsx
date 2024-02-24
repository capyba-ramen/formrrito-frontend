import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import AddIcon from '@mui/icons-material/Add';
import RefineButton from '@/pages/FormEdit/QuestionItem/QuestionEdit/TextFieldWithAISuggestion/RefineButton';
import RefinedSuggestion from '@/pages/FormEdit/QuestionItem/QuestionEdit/TextFieldWithAISuggestion/RefinedSuggestion';
import useRefineOptions from '@/api/option/useRefineOptions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { OptionField } from '@/types/option';

import * as classNames from 'classnames/bind';
import style from './AddOption.module.scss';
const cx = classNames.bind(style);

export interface AddOptionProps {
  append: (option: OptionField) => void;
  index: number;
}

const AddOption = (props: AddOptionProps) => {
  const { append, index } = props;
  const { trigger: refineOptions, isMutating } = useRefineOptions();
  const { getValues } = useFormContext();
  const [open, setOpen] = React.useState(false);
  const [suggestedOptions, setSuggestedOptions] = React.useState([]);
  const anchorRef = React.useRef<HTMLDivElement | null>(null);
  const handleButtonClick = () => {
    setOpen(true);

    refineOptions({
      question_title: getValues(`questions.${index}.title`),
      current_options: getValues(`questions.${index}.options`).map((el: { title: string }) => el.title),
    }).then((res) => {
      if (res.data) {
        setSuggestedOptions(res.data);
      }
    });
  };

  const handleAppendOption = (title?: string) => {
    append({
      optionId: '',
      title: title || `Option ${getValues(`questions.${index}.options`)?.length + 1}`,
    });
  };

  const handleAccept = (option: string) => {
    handleAppendOption(option);
    setSuggestedOptions(suggestedOptions.filter((el) => el !== option));
  };

  const handleDiscard = (option: string) => {
    setSuggestedOptions(suggestedOptions.filter((el) => el !== option));
  };

  const handleClose = () => {
    setOpen(false);
    setSuggestedOptions([]);
  };

  React.useEffect(() => {
    if (!suggestedOptions.length) setOpen(false);
  }, [suggestedOptions]);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', color: 'var(--black)', cursor: 'pointer' }}>
        <Button
          startIcon={<AddIcon />}
          onClick={() => {
            handleAppendOption();
          }}
        >
          Add option
        </Button>
        <div className={cx('or')}>or</div>
        <div ref={anchorRef}>
          <RefineButton
            tooltipTitle="Use AI to refine the options"
            onClick={handleButtonClick}
            buttonText="Refine options"
            isLoading={isMutating}
          />
        </div>
      </div>
      <RefinedSuggestion onClose={handleClose} anchorEl={anchorRef.current} open={open}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          {`Suggested options for "${getValues(`questions.${index}.title`) || `Question ${index + 1}`}"`}
        </Typography>
        {!!suggestedOptions.length && (
          <>
            {suggestedOptions.map((option, idx) => (
              <div className={cx('suggestion')} key={`suggested-${idx}`}>
                <Typography variant="subtitle2" color="var(--gray-3)">
                  {option}
                </Typography>
                <div className={cx('actions')}>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ marginRight: '8px' }}
                    onClick={() => {
                      handleDiscard(option);
                    }}
                  >
                    Discard
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                      handleAccept(option);
                    }}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
      </RefinedSuggestion>
    </>
  );
};

AddOption.displayName = 'AddOption';

export default AddOption;
