import axios from 'axios';

// Vite exposes environment variables only when they start with VITE_.
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// An Axios instance centralizes the API base URL and shared behavior.
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors are useful for adding auth headers or logging API errors later.
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
