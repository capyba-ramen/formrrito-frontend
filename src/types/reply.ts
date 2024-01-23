import { Question } from './question';

export type Reply = {
  question_id: string;
  question_type: Question['type'];
  option_id: string;
  option_title: string;
  answer: string;
};
