import * as React from 'react';

import { QuestionField } from '../AddQuestionButton/AddQuestionButton';
import QuestionItem from '@/components/QuestionItem/QuestionItem';

export interface QuestionsProps {
  questions: (QuestionField & { id: string })[];
}

const Questions = (props: QuestionsProps) => {
  const { questions } = props;
  const [activeQuestionId, setActiveQuestionId] = React.useState<string | undefined>(undefined);

  return (
    <>
      {questions?.map((q, index) => (
        <QuestionItem
          key={q.id}
          index={index}
          active={activeQuestionId === q.qId}
          onSetActiveQId={setActiveQuestionId}
          {...q}
        />
      ))}
    </>
  );
};

Questions.displayName = 'Questions';

export default Questions;
