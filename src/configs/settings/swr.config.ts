import { getFetcher } from '../../api/fetchers';

const swrConfig = {
  revalidateOnFocus: false,
  revalidateIfStale: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
  fetcher: getFetcher,
};

export default swrConfig;
