import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
