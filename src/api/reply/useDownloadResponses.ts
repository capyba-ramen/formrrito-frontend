import useSWRMutation from 'swr/mutation';
import { postFetcher } from '../fetchers';

interface DownloadResponsesArgs {
  form_id: string;
}

type DownloadResponsesApiData = {
  data: string;
};

export default function useDownloadResponses() {
  const { trigger, isMutating } = useSWRMutation<DownloadResponsesApiData, unknown, string, DownloadResponsesArgs>(
    `/api/reply/responses`,
    postFetcher
  );

  return {
    trigger,
    isMutating,
  };
}
