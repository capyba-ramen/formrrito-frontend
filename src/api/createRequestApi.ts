import * as React from 'react';
import useSWR, { SWRConfiguration, SWRResponse, preload, mutate } from 'swr';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import client from './client';
import serializeKey, { SerializeKey } from './serializeKey';

type Config = {
  key: string | SerializeKey;
};

type UseRequestReturn<T> = {
  isFetching: boolean;
  response?: AxiosResponse<T>;
  data?: any;
  error?: any;
};

export default function createRequestApi<T>(config: Config) {
  const { key: _key } = config;

  const useRequest = (
    params?: any,
    swrOptions?: SWRConfiguration,
    axiosOptions?: AxiosRequestConfig
  ): SWRResponse<AxiosResponse<T>, any> & UseRequestReturn<T> => {
    const key = React.useMemo(() => serializeKey(_key, params), [params]);

    const { data, error, mutate, isValidating, isLoading } = useSWR<AxiosResponse<T>>(
      key,
      (url) =>
        client
          .get(url, {
            ...axiosOptions,
          })
          .then((res: AxiosResponse) => res.data),
      swrOptions
    );

    return {
      data,
      response: data,
      error,
      mutate,
      isValidating,
      isLoading,
      isFetching: isLoading || isValidating,
    };
  };

  const preloadByKey = (params: any) => preload(serializeKey(_key, params), (url: string) => client.get(url));

  const mutateByKey = (params: any, args: Parameters<typeof mutate>) => mutate(serializeKey(_key, params), args);

  return {
    useRequest,
    preload: preloadByKey,
    mutate: mutateByKey,
  };
}
