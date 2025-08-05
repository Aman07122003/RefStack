import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://refstack.onrender.com', // Backend API base
  withCredentials: false, // set to true if you use cookies/auth
});

export default axiosInstance;
