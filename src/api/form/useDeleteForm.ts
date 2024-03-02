import useSWRMutation from 'swr/mutation';
import client from '../client';

interface DeleteFormArgs {
  formId: string;
}

type DeleteFormApiData = {
  data: boolean;
};

const apiDeleteForm = (
  _: string,
  {
    arg: { formId },
  }: {
    arg: DeleteFormArgs;
  }
) => client.delete(`/api/form/${formId}`);

export default function useDeleteForm() {
  const { trigger, isMutating } = useSWRMutation<DeleteFormApiData, unknown, string, DeleteFormArgs>(
    `/api/form/formId`,
    apiDeleteForm
  );

  return {
    trigger,
    isMutating,
  };
}
