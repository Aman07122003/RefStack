import axios from "axios";

// Ensure the API base URL includes the /api prefix
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`, // ✅ Now points to backend API
  withCredentials: false,
});

export default axiosInstance;
