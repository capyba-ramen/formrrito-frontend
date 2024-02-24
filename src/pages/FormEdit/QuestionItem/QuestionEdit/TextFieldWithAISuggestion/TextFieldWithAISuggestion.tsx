import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import RefineButton from './RefineButton';
import RefinedSuggestion from './RefinedSuggestion';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import * as classNames from 'classnames/bind';
import style from './TextFieldWithAISuggestion.module.scss';
const cx = classNames.bind(style);

export interface TextFieldWithAISuggestionProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: { type?: string; message?: string } | null;
  isLoading?: boolean;
  onRefineButtonClick: () => void;
  content?: string;
  fieldName: string;
  label: string;
}

const TextFieldWithAISuggestion = React.forwardRef((props: TextFieldWithAISuggestionProps, ref) => {
  const { label, value, onChange, error, isLoading, onRefineButtonClick, content, fieldName } = props;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLInputElement | null>(null);
  const { setValue } = useFormContext();

  const handleButtonClick = () => {
    setOpen(true);
    onRefineButtonClick();
  };

  const handleAccept = () => {
    setOpen(false);

    setValue(fieldName, content, { shouldDirty: true });
  };

  const handleDiscard = () => {
    setOpen(false);
  };

  return (
    <>
      <TextField
        inputRef={ref}
        label={label}
        value={value}
        variant="standard"
        onChange={onChange}
        error={!!error?.type}
        helperText={error?.message}
        sx={{ width: '100%' }}
        ref={anchorRef}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <RefineButton
                tooltipTitle="Use AI to refine the input"
                onClick={handleButtonClick}
                disabled={!value}
                isLoading={isLoading}
              />
            </InputAdornment>
          ),
        }}
      />
      <RefinedSuggestion anchorEl={anchorRef.current} open={open} sameAsAnchorWidth isLoading={isLoading}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          {`Suggestion for "${value}"`}
        </Typography>
        {content && (
          <div className={cx('suggestion')}>
            <Typography variant="subtitle2" color="var(--gray-3)">
              {content}
            </Typography>
            <div className={cx('actions')}>
              <Button variant="outlined" sx={{ marginRight: '8px' }} onClick={handleDiscard}>
                Discard
              </Button>
              <Button variant="contained" onClick={handleAccept}>
                Accept
              </Button>
            </div>
          </div>
        )}
      </RefinedSuggestion>
    </>
  );
});

TextFieldWithAISuggestion.displayName = 'TextFieldWithAISuggestion';

export default TextFieldWithAISuggestion;
