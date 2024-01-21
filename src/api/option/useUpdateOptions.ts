import useSWRMutation from 'swr/mutation';
import client from '../client';
import { Option } from '@/types/option';

const apiPostUpdateOptions = (
  _: string,
  {
    arg: { formId, questionId, options },
  }: {
    arg: {
      formId: string;
      questionId: string;
      options: Option[];
    };
  }
) => {
  return client.post(`/api/option/${formId}/${questionId}`, { options });
};

export default function useUpdateOptions() {
  const { trigger, isMutating } = useSWRMutation(`/api/option/formId/questionId`, apiPostUpdateOptions);

  return {
    trigger,
    isMutating,
  };
}
