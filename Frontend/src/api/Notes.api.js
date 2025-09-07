import axiosInstance from "../utils/axiosInstance";

export const createNote = async (formData) => {
    try {
      const response = await axiosInstance.post('/api/notes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

export const dsaNotes = async (data) => {
    try {
        const response = await axiosInstance.post('/api/notes/dsa', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}
  

export const getAllNotes = async () => {
    try {
        const response = await axiosInstance.get('/api/notes');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const getNoteById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/notes/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const deleteNote = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/notes/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const downloadNoteAsPDF = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/notes/${id}/download`, {
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}



