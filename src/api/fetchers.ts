import client from './client';
import { AxiosResponse } from 'axios';

export type Fetcher = (url: string, { arg }: { arg?: any }) => Promise<AxiosResponse>;

export const postFetcher: Fetcher = (url: string, { arg }: { arg?: any }) => client.post(url, arg);

export const deleteFetcher: Fetcher = (url: string, { arg }: { arg?: any }) => client.delete(url, arg);

export const putFetcher: Fetcher = (url: string, { arg }: { arg?: any }) => client.put(url, arg);

export const getFetcher = (args) => client.get(args).then((res: AxiosResponse) => res.data);
