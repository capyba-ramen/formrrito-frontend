import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

interface SignUpArgs {
  email: string;
  password: string;
  username: string;
}

type SignUpApiData = {
  data: {
    email: string;
    id: string;
    username: string;
  };
};

export default function useSignUp() {
  const { trigger, isMutating } = useSWRMutation<SignUpApiData, unknown, string, SignUpArgs>(
    '/api/user/signup',
    postFetcher
  );

  return {
    trigger,
    isMutating,
  };
}
