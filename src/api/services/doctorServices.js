import axios from "axios";
import { API_BASE_URL } from "../config";

const URL = `${API_BASE_URL}/doctors`;

export const findAllDoctors = async () => {
    try {
        const response = await axios.get(URL);
        // Si la respuesta está vacía, puedes retornar un arreglo vacío.
        return response.data.length > 0 ? response.data : [];
    } catch (error) {
        console.error(error);
        return { error: true, message: "No se pudo cargar los doctores" };
    }
};

export const saveDoctor = async (doctor) => {
    try {
        return await axios.post(URL, doctor);
    } catch (error) {
        throw error;
    }
};

export const updateDoctor = async (doctor) => {
    try {
        return await axios.put(`${URL}/${doctor.id}`, doctor);
    } catch (error) {
        throw error;
    }
};

export const removeDoctor = async (id) => {
    try {
        await axios.delete(`${URL}/${id}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const findDoctorsBySpecialty = async (specialtyId) => {
    try {
        const response = await axios.get(`${URL}/specialty/${specialtyId}`);
        return response.data.length > 0 ? response.data : [];
    } catch (error) {
        console.error("Error al cargar los doctores por especialidad", error);
        return { error: true, message: "No se pudo cargar los doctores por especialidad" };
    }
};