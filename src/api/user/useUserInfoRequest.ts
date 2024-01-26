import createRequestApi from '@/api/createRequestApi';
import { UserInfoApiData } from '@/types/user';

const {
  useRequest: useUserInfoRequest,
  preload,
  mutate,
} = createRequestApi<UserInfoApiData>({
  key: (shouldFetch) => (shouldFetch ? `/api/user/info` : ''),
});

export { preload, mutate };

export default useUserInfoRequest;
