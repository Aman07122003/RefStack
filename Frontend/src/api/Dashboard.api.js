import axiosInstance from "../utils/axiosInstance";
const API_BASE = '/dashboard';


export const createDashboard = async (data) => {
    try {
        const response = await axiosInstance.post(`${API_BASE}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

