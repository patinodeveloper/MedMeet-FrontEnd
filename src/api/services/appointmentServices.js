import axios from "axios";
import { API_BASE_URL } from "../config";

const URL = `${API_BASE_URL}/appointments`;

export const findAllAppointments = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const findAppointmentsById = async (id) => {
    try {
        const response = await axios.get(`${URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const findAppointmentsByDoctorAndDate = async (idDoctor, date) => {
    try {
        const response = await axios.get(`${URL}/doctor/${idDoctor}/date/${date}`)
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Conflicto de horario:", error.response.data);
        }
        console.error("Error al obtener los horarios por día:", error);
        throw error;
    }    
};

export const saveAppointment = async (appointment) => {
    try {
        return await axios.post(URL, appointment);
    } catch (error) {
        throw error;
    }
};

export const updateAppointment = async (appointment) => {
    try {
        return await axios.put(`${URL}/${appointment.id}`, appointment);
    } catch (error) {
        throw error;
    }
};

export const removeAppointment = async (id) => {
    try {
        await axios.delete(`${URL}/${id}`);
    } catch (error) {
        throw error;
    }
};
