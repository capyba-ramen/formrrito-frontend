import createRequestApi from '@/api/createRequestApi';
import { UnShortenedUrlApiData } from '@/types/tool';

const {
  useRequest: useFormUrlRequest,
  preload,
  mutate,
} = createRequestApi<UnShortenedUrlApiData>({
  key: (shortenedUrl) => `/api/tool/shortened_url/${shortenedUrl}`,
});

export { preload, mutate };

export default useFormUrlRequest;
