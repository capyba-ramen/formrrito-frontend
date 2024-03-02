import { OptionField, Option } from './option';

export type Question = {
  id: string;
  type: number;
  title: string;
  description: string;
  image_url: string;
  options: Option[];
  is_required: boolean;
  created_at: string;
};

// type used in the react-hook-form form
export type QuestionField = {
  qId: string;
  type: number;
  title: string;
  description: string;
  required: boolean;
  options: OptionField[];
};
