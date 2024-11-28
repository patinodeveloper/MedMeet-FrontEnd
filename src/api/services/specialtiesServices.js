import axios from 'axios';
import { API_BASE_URL } from '../config';

const URL = `${API_BASE_URL}/specialties`;

export const findAllSpecialties = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching specialties", error);
        throw error;
    }
};

export const saveSpecialty = async (specialty) => {
    try {
        return await axios.post(URL, specialty);
    } catch (error) {
        console.error("Error saving specialty", error);
        throw error;
    }
};

export const updateSpecialty = async (specialty) => {
    try {
        return await axios.put(`${URL}/${specialty.id}`, specialty);
    } catch (error) {
        console.error("Error updating specialty", error);
        throw error;
    }
};

export const removeSpecialty = async (id) => {
    try {
        await axios.delete(`${URL}/${id}`);
    } catch (error) {
        console.error("Error removing specialty", error);
        throw error;
    }
};
