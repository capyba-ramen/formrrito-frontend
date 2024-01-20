import { useParams } from 'react-router-dom';

import Button, { ButtonProps } from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import useCreateQuestion from '@/api/question/useCreateQuestion';
import { QuestionField } from '@/types/question';

import * as classNames from 'classnames/bind';
import style from './AddQuestionButton.module.scss';
const cx = classNames.bind(style);

export interface AddQuestionButtonProps extends ButtonProps {
  append: (params: QuestionField) => void;
}

const AddQuestionButton = (props: AddQuestionButtonProps) => {
  const { append, ...other } = props;
  const { formId } = useParams();

  const { trigger: postCreateQuestion } = useCreateQuestion(formId);

  const handleCreate = () => {
    postCreateQuestion().then((res) => {
      if (res.data.question_id) {
        append({
          qId: '',
          type: 0,
          title: '',
          description: '',
          required: false,
          options: [],
        });
      }
    });
  };

  return (
    <Button
      startIcon={<ControlPointIcon />}
      classes={{
        root: cx('root', 'button'),
      }}
      onClick={handleCreate}
      {...other}
    >
      Add Question
    </Button>
  );
};

AddQuestionButton.displayName = 'AddQuestionButton';

export default AddQuestionButton;
