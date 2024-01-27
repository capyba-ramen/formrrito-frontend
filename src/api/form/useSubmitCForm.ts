import useSWRMutation from 'swr/mutation';
import client from '../client';
import { Reply } from '@/types/reply';

const apiPostSubmitReply = (_: string, { arg: { formId, replies } }: { arg: { formId: string; replies: Reply[] } }) => {
  return client.post(`/api/reply/${formId}`, { replies });
};

export default function useSubmitCForm() {
  const { trigger, isMutating } = useSWRMutation('/api/reply/formId', apiPostSubmitReply);

  return {
    trigger,
    isMutating,
  };
}
