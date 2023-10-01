import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 200000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
