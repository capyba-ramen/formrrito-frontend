import { useEffect, useMemo, useRef } from 'react';
import useSWRMutation, { SWRMutationConfiguration, SWRMutationResponse } from 'swr/mutation';
import { AxiosRequestConfig } from 'axios';
import client from './client';
import { Fetcher } from './fetchers';
import serializeKey, { SerializeKey } from './serializeKey';

type Config<T> = {
  key: string | SerializeKey<T>;
  fetcher: Fetcher;
};

type UseMutationReturn<T> = {
  response?: SWRMutationResponse['data'];
  data?: T;
  error?: SWRMutationResponse['error'];
  isMutating: boolean;
  reset: () => void;
  trigger: SWRMutationResponse['trigger'];
};

export default function createMutationApi<T>(config: Config<T>) {
  const { key: _key, fetcher } = config;

  const useMutation = (
    params: any,
    swrOptions?: SWRMutationConfiguration,
    axiosOptions?: AxiosRequestConfig
  ): UseMutationReturn<T> => {
    const key = useMemo(() => serializeKey(_key, params), [params]);
    const abortRef = useRef<AbortController | null>(null);

    const { data, error, isMutating, reset, trigger } = useSWRMutation<SWRMutationResponse>(
      key,
      (url, options) => {
        if (abortRef.current) {
          abortRef.current.abort();
          console.debug('[API] Canceled when url changed.', url);
        }
        const controller = new AbortController();
        abortRef.current = controller;
        return fetcher(url, {
          arg: options,
          client,
          axiosOptions: {
            signal: controller.signal,
            ...axiosOptions,
          },
          aborter: controller,
        });
      },
      swrOptions
    );

    useEffect(() => {
      return () => {
        abortRef.current?.abort();
        console.debug('[API] Canceled when unmount.');
      };
    }, []);

    return {
      response: data,
      data: data?.data,
      error,
      isMutating,
      reset,
      trigger,
    };
  };

  return { useMutation };
}
