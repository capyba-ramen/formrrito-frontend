import client from './client';
import { AxiosResponse } from 'axios';

type Fetcher = (url: string, { arg }: { arg: any }) => Promise<AxiosResponse>;

export const postFetcher: Fetcher = (url: string, { arg }) => client.post(url, arg);

export const deleteFetcher: Fetcher = (url: string, { arg }) => client.delete(url, arg);

export const putFetcher: Fetcher = (url: string, { arg }) => client.put(url, arg);

export const getFetcher: Fetcher = (args) => client.get(args).then((res: AxiosResponse) => res.data);
