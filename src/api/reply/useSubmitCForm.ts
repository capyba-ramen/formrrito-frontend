import useSWRMutation from 'swr/mutation';
import client from '../client';
import { Reply } from '@/types/reply';

interface SubmitReplyArgs {
  formId: string;
  replies: Reply[];
}

type SubmitReplyApiData = {
  data: boolean;
};

const apiPostSubmitReply = (_: string, { arg: { formId, replies } }: { arg: SubmitReplyArgs }) => {
  return client.post(`/api/reply/${formId}`, { replies });
};

export default function useSubmitCForm() {
  const { trigger, isMutating } = useSWRMutation<SubmitReplyApiData, unknown, string, SubmitReplyArgs>(
    '/api/reply/formId',
    apiPostSubmitReply
  );

  return {
    trigger,
    isMutating,
  };
}
