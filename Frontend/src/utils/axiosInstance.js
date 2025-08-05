import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Backend API base
  withCredentials: false, // set to true if you use cookies/auth
});

export default axiosInstance;
