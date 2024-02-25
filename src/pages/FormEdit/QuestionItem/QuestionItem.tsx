import { QuestionField } from '@/types/question';
import QuestionEdit from './QuestionEdit/QuestionEdit';
import QuestionDisplay from './QuestionDisplay/QuestionDisplay';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import * as classNames from 'classnames/bind';
import style from './QuestionItem.module.scss';
const cx = classNames.bind(style);

export interface QuestionItemProps {
  index: number;
  active: boolean;
  error: boolean;
  onClick: () => void;
  onQuestionSwap: (index1: number, index2: number) => void;
  onQuestionClickAway: () => void;
  qId: QuestionField['qId'];
}

const QuestionItem = (props: QuestionItemProps) => {
  const { active, error, qId, index, onClick, onQuestionSwap, onQuestionClickAway } = props;

  return (
    <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={onQuestionClickAway}>
      <div className={cx('root', { active, error })} onClick={onClick}>
        {active ? (
          <QuestionEdit qId={qId} index={index} onQuestionSwap={onQuestionSwap} />
        ) : (
          <QuestionDisplay qId={qId} index={index} />
        )}
      </div>
    </ClickAwayListener>
  );
};

QuestionItem.displayName = 'QuestionItem';

export default QuestionItem;
