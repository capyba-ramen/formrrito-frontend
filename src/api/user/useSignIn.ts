import useSWRMutation from 'swr/mutation';

import client from '../client';
import { postFetcher } from '../fetchers';
import useAuth from '@/components/AuthProvider/useAuth';
import { getToken, setToken } from '@/utils/auth';

interface SignInArgs {
  email: string;
  password: string;
}

type SignInApiData = {
  data: {
    access_token: string;
    token_type: string;
  };
};

type UserInfoApiData = {
  user_id: string;
  username: string;
  expire_time: string;
};

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
  const { trigger: signIn, isMutating } = useSWRMutation<SignInApiData, unknown, string, SignInArgs>(
    '/api/user/signin',
    postFetcher
  );
  const { trigger: getUserInfo } = useSWRMutation<UserInfoApiData, unknown, string, string>(
    '/api/user/info',
    updateUser,
    { revalidate: false }
  );

  const handleSignIn = async ({ email, password }) => {
    return signIn({ email, password }).then((res) => {
      const token = res.data.access_token;

      if (token) {
        setToken(token);
        getUserInfo(token).then((res) => {
          setLoggedInUser({ name: res.username });
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
