import useSWRMutation from 'swr/mutation';
import client from '../client';

interface CreateTemplateArgs {
  template: string;
}

type CreateTemplateApiData = {
  data: {
    form_id: string;
  };
};

const apiPostCreateTemplate = (_: string, { arg: { template } }: { arg: CreateTemplateArgs }) => {
  return client.post(`/api/form/custom/${template}`);
};

export default function useCreateTemplateForm() {
  const { trigger, isMutating, error } = useSWRMutation<CreateTemplateApiData, unknown, string, CreateTemplateArgs>(
    '/api/form/custom/template',
    apiPostCreateTemplate
  );

  return {
    trigger,
    isMutating,
    error,
  };
}
