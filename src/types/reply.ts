import { Question } from './question';

export type Reply = {
  question_id: string;
  question_type: Question['type'];
  option_ids?: string[];
  option_titles?: string[];
  answer?: string;
};

// type used in the react-hook-form form
export interface ReplyField extends Question {
  value: string | string[];
  question_id: string;
}

export type QuestionStat = {
  title: string;
  count: number;
  type: Question['type'];
  responses?: string[];
  options?: OptionStat[];
};

export type OptionStat = {
  title: string;
  count: number;
};
