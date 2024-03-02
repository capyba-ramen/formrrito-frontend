import useSWRMutation from 'swr/mutation';
import client from '../client';
import { Option } from '@/types/option';

interface UpdateOptionsArgs {
  formId: string;
  questionId: string;
  options: Option[];
}

type UpdateOptionsApiData = {
  data: Option[] | null;
};

const apiPostUpdateOptions = (
  _: string,
  {
    arg: { formId, questionId, options },
  }: {
    arg: UpdateOptionsArgs;
  }
) => client.post(`/api/option/${formId}/${questionId}`, { options });

export default function useUpdateOptions() {
  const { trigger, isMutating } = useSWRMutation<UpdateOptionsApiData, unknown, string, UpdateOptionsArgs>(
    `/api/option/formId/questionId`,
    apiPostUpdateOptions
  );

  return {
    trigger,
    isMutating,
  };
}
