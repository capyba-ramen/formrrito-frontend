import useSWRMutation from 'swr/mutation';
import client from '../client';

const apiDeleteForm = (
  _: string,
  {
    arg: { formId },
  }: {
    arg: {
      formId: string;
    };
  }
) => client.delete(`/api/form/${formId}`);

export default function useDeleteForm() {
  const { trigger, isMutating } = useSWRMutation(`/api/form/formId`, apiDeleteForm);

  return {
    trigger,
    isMutating,
  };
}
