import { ImageUrlType } from '@/constants/form';
import { QuestionField } from '@/types/question';

export type Form = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  opened_at: string;
  user_id: string;
  accepts_reply: boolean;
  image_url: keyof ImageUrlType;
};

export type FormListApiData = {
  count: number;
  has_next: boolean;
  limit: number;
  offset: number;
  result: Form[];
};

export type FormCreateApiData = {
  data: {
    form_id: string;
  };
};

export type TemplateFormCreateApiData = {
  data: {
    form_id: string;
  };
};

export type FormValues = {
  title: string;
  description: string;
  acceptResponse: boolean;
  imageUrl: string;
  questions: QuestionField[];
};
