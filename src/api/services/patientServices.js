import axios from "axios";
import { API_BASE_URL } from "../config";

const URL = `${API_BASE_URL}/patients`;

export const findAllPatients = async () => {
    try {
        const response = await axios.get(URL);
        return response.data.length > 0 ? response.data : [];
    } catch (error) {
        console.error(error);
        return { error: true, message: "Error al cargar los pacientes" };
    }
};

export const savePatient = async (patient) => {
    try {
        return await axios.post(URL, patient);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updatePatient = async (patient) => {
    try {
        return await axios.put(`${URL}/${patient.id}`, patient);
    } catch (error) {
        throw error;
    }
};

export const removePatient = async (id) => {
    try {
        await axios.delete(`${URL}/${id}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};