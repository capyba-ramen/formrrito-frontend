import * as React from 'react';
import { QuestionField } from '@/types/question';
import QuestionEdit from './QuestionEdit/QuestionEdit';
import QuestionDisplay from './QuestionDisplay/QuestionDisplay';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import * as classNames from 'classnames/bind';
import style from './QuestionItem.module.scss';
const cx = classNames.bind(style);

export interface QuestionItemProps extends QuestionField {
  index: number;
  active: boolean;
  error: boolean;
  onClick: () => void;
  onQuestionSwap: (index1: number, index2: number) => void;
  onQuestionClickAway: () => void;
}

const QuestionItem = React.forwardRef((props: QuestionItemProps, ref: React.Ref<HTMLDivElement>) => {
  const { active, error, qId, index, onClick, onQuestionSwap, onQuestionClickAway } = props;

  return (
    <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={onQuestionClickAway}>
      <div className={cx('root', { active, error })} onClick={onClick} ref={ref}>
        {active ? (
          <QuestionEdit qId={qId} index={index} onQuestionSwap={onQuestionSwap} />
        ) : (
          <QuestionDisplay qId={qId} index={index} />
        )}
      </div>
    </ClickAwayListener>
  );
});

QuestionItem.displayName = 'QuestionItem';

export default QuestionItem;
