// src/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ✅ Must start with VITE_
  withCredentials: false,
});

export default axiosInstance;
