import createRequestApi from '@/api/createRequestApi';

const {
  useRequest: useFormUrlRequest,
  preload,
  mutate,
} = createRequestApi<string>({
  key: (shortenedUrl) => (shortenedUrl ? `/api/tool/shortened_url/${shortenedUrl}` : null),
});

export { preload, mutate };

export default useFormUrlRequest;
