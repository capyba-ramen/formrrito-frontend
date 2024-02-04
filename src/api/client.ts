import axios from 'axios';
import { getToken } from '@/utils/auth';

const token = getToken();

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : null,
  },
});

export default client;
