import axios from 'axios';

const token = localStorage.getItem('access_token');

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : null,
  },
});

export default client;
