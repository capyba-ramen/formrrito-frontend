import { Question } from '@/types/question';
import QuestionEdit from './QuestionEdit/QuestionEdit';
import QuestionDisplay from './QuestionDisplay/QuestionDisplay';

import * as classNames from 'classnames/bind';
import style from './QuestionItem.module.scss';
const cx = classNames.bind(style);

export interface QuestionItemProps {
  qId: Question['id'];
  type?: Question['type'];
  title: Question['title'];
  description?: Question['description'];
  active: boolean;
  index: number;
  onSetActiveQId: (qId?: Question['id']) => void;
  options: Question['options'];
}

const QuestionItem = (props: QuestionItemProps) => {
  const { active, qId, index, onSetActiveQId } = props;

  return (
    <div className={cx('root', { active })}>
      {active ? (
        <QuestionEdit qId={qId} index={index} />
      ) : (
        <QuestionDisplay qId={qId} index={index} onSetActiveQId={onSetActiveQId} />
      )}
    </div>
  );
};

QuestionItem.displayName = 'QuestionItem';

export default QuestionItem;
