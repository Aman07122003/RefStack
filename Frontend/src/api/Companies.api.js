import axiosInstance from "../utils/axiosInstance";

export const getCompanies = async () => {
    try {
        const response = await axiosInstance.get('/api/companies');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const createCompany = async (data) => {
    try {
        const response = await axiosInstance.post('/api/companies', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const getCompanyById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/companies/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const updateCompany = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/api/companies/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const deleteCompany = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/companies/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}