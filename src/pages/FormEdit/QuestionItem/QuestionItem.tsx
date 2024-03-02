import * as React from 'react';
import { QuestionField } from '@/types/question';
import QuestionEdit from './QuestionEdit/QuestionEdit';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import * as classNames from 'classnames/bind';
import style from './QuestionItem.module.scss';
const cx = classNames.bind(style);

export interface QuestionItemProps {
  index: number;
  active: boolean;
  error: boolean;
  onClick: () => void;
  onQuestionClickAway: () => void;
  qId: QuestionField['qId'];
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  className?: string;
}

const QuestionItem = (props: QuestionItemProps) => {
  const {
    active,
    error,
    qId,
    index,
    onClick,
    onQuestionClickAway,
    onDragStart,
    onDragOver,
    onDrop,
    onDragLeave,
    style,
    className,
  } = props;

  return (
    <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={onQuestionClickAway}>
      <div
        className={cx('root', { editing: active, error }, className)}
        onClick={onClick}
        data-position={index}
        draggable={!active}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
        style={style}
      >
        {!active && (
          <div className={cx('drag')}>
            <DragIndicatorIcon className={cx('drag-icon')} />
          </div>
        )}
        <QuestionEdit qId={qId} index={index} isEditMode={active} />
      </div>
    </ClickAwayListener>
  );
};

QuestionItem.displayName = 'QuestionItem';

export default QuestionItem;
