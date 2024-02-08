import createRequestApi from '@/api/createRequestApi';
import { UserInfoApiData } from '@/types/user';

const {
  useRequest: useUserInfoRequest,
  preload,
  mutate,
} = createRequestApi<UserInfoApiData>({
  key: `/api/user/info`,
});

export { preload, mutate };

export default useUserInfoRequest;
