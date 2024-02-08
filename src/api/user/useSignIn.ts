import useSWRMutation from 'swr/mutation';

import client from '../client';
import { postFetcher } from '../fetchers';
import useAuth from '@/components/AuthProvider/useAuth';
import { getToken, setToken } from '@/utils/auth';

const updateUser = async (url: string, { arg }: { arg?: string }) =>
  client
    .get(url, {
      headers: {
        Authorization: `Bearer ${arg || getToken()}`,
      },
    })
    .then((res) => res.data);

export default function useSignIn() {
  const { closeAuthDialog, setLoggedInUser } = useAuth();
  const { trigger, isMutating } = useSWRMutation('/api/user/signin', postFetcher);
  const { trigger: getUserInfo } = useSWRMutation('/api/user/info', updateUser, { revalidate: false });

  const handleSignIn = async (arg: { email: string; password: string }) => {
    return trigger(arg).then((res) => {
      const token = res.data.access_token;

      if (token) {
        setToken(token);
        getUserInfo(token).then((data) => {
          setLoggedInUser({ name: data.username });
          closeAuthDialog();
        });
      }
    });
  };

  return {
    trigger: handleSignIn,
    isMutating,
  };
}
