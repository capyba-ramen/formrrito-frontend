import * as React from 'react';

import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import * as classNames from 'classnames/bind';
import style from './RefinedSuggestion.module.scss';
const cx = classNames.bind(style);

export interface RefinedSuggestionProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose?: () => void;
  children?: React.ReactNode;
  sameAsAnchorWidth?: boolean;
  isShowCloseButton?: boolean;
}

const RefinedSuggestion = (props: RefinedSuggestionProps) => {
  const { open, anchorEl, onClose, children, sameAsAnchorWidth } = props;

  return (
    <Popper
      placement="bottom-start"
      style={
        sameAsAnchorWidth
          ? {
              width: anchorEl?.clientWidth,
            }
          : {}
      }
      role="menu"
      open={open}
      anchorEl={anchorEl}
      className={cx('popper')}
    >
      <Paper className={cx('root')}>{children}</Paper>
      {onClose && (
        <IconButton size="small" aria-label="delete" className={cx('delete-button')} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </Popper>
  );
};

RefinedSuggestion.displayName = 'RefinedSuggestion';

export default RefinedSuggestion;
