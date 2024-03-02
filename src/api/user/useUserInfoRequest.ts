import createRequestApi from '@/api/createRequestApi';

type UserInfoApiData = {
  user_id: string;
  username: string;
  expire_time: string;
};

const {
  useRequest: useUserInfoRequest,
  preload,
  mutate,
} = createRequestApi<UserInfoApiData>({
  key: `/api/user/info`,
});

export { preload, mutate };

export default useUserInfoRequest;
