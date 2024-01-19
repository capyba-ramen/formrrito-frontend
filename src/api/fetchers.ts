import client from './client';

export const postFetcher = (url, { arg }) => client.post(url, arg);

export const deleteFetcher = (url, { arg }) => client.delete(url, arg);

export const putFetcher = (url, { arg }) => client.put(url, arg);

export const getFetcher = (...args) => client.get(...args).then((res) => res.data);
