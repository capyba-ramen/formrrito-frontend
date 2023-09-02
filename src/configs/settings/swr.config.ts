import { get } from '../../api/base';

const swrConfig = {
  revalidateOnFocus: false,
  revalidateIfStale: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
  fetcher: get,
};

export default swrConfig;
