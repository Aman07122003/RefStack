import axiosInstance from "../utils/axiosInstance";

export const getEmployees = async () => {
    try {
        const response = await axiosInstance.get('/api/employees');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const createEmployee = async (data) => {
    try {
        const response = await axiosInstance.post('/api/employees', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const getEmployeeById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/employees/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const updateEmployee = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/api/employees/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}
export const deleteEmployee = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/employees/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}
export const getEmployeesByCompanyId = async (companyId) => {
    try {
        const response = await axiosInstance.get(`/api/employees/company/${companyId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}
