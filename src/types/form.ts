import { Question, QuestionField } from '@/types/question';

export type Form = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  opened_at: string;
  user_id: string;
  accepts_reply: boolean;
  image_url: string;
  questions: Question[];
};

// type used in the react-hook-form form
export type FormField = {
  title: string;
  description: string;
  acceptsReply: boolean;
  imageUrl: string;
  questions: QuestionField[];
};
