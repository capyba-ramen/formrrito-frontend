import useSWRMutation from 'swr/mutation';
import client from '../client';

const apiPostCreateTemplate = (_: string, { arg: { template } }: { arg: { template: string } }) => {
  return client.post(`/api/form/custom/${template}`);
};

export default function useCreateTemplateForm() {
  const { trigger, isMutating } = useSWRMutation('/api/form/custom/template', apiPostCreateTemplate);

  return {
    trigger,
    isMutating,
  };
}
