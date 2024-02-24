import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import Button, { ButtonProps } from '@mui/material/Button';

export interface RefineButtonProps extends ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  tooltipTitle?: string;
  buttonText?: string;
}

const RefineButton = (props: RefineButtonProps) => {
  const { onClick, disabled, isLoading, tooltipTitle, buttonText, ...other } = props;

  return (
    <Tooltip title={tooltipTitle}>
      <Button
        size="small"
        aria-label="ai-refine"
        sx={{ color: 'var(--green-1)', ...(buttonText ? {} : { borderRadius: '50%', minWidth: 'auto' }) }}
        onClick={onClick}
        disabled={disabled}
        {...other}
      >
        {isLoading ? (
          <CircularProgress size={16} />
        ) : (
          <>
            {buttonText && <span style={{ marginRight: '4px' }}>{buttonText}</span>}
            <AutoAwesomeRoundedIcon />
          </>
        )}
      </Button>
    </Tooltip>
  );
};

RefineButton.displayName = 'RefineButton';

export default RefineButton;
