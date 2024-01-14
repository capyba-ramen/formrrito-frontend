import client from './client';

export const postFetcher = (url, { arg }) => client.post(url, arg);

// export const postFetcher = (url, { arg, client, axiosOptions }) => client.post(url, arg, axiosOptions);

export const getFetcher = (...args) => client.get(...args).then((res) => res.data);
