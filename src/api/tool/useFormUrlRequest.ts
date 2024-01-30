import createRequestApi from '@/api/createRequestApi';
import { UnShortenedUrlApiData } from '@/types/tool';

const {
  useRequest: useFormUrlRequest,
  preload,
  mutate,
} = createRequestApi<UnShortenedUrlApiData>({
  key: (shortenedUrl) => (shortenedUrl ? `/api/tool/shortened_url/${shortenedUrl}` : null),
});

export { preload, mutate };

export default useFormUrlRequest;
