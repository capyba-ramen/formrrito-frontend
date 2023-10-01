import client from './client';
import { AxiosResponse } from 'axios';

export const getFetcher = async <T>(url: string, config?: any): Promise<T> => {
  const response: AxiosResponse<T> = await client.get(url, config);
  return response.data;
};
