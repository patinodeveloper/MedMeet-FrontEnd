import axios from "axios";
import { API_BASE_URL } from "../config";

const URL = `${API_BASE_URL}/schedules`;

export const findAllSchedules = async () => {
    try {
        const response = await axios.get(URL);
        return response.data.length > 0 ? response.data : [];
    } catch (error) {
        console.error(error);
        return { error: true, message: "Error al cargar los horarios" };
    }
};

export const findSchedulesByDoctorId = async (id) => {
    try {
        const response = await axios.get(`${URL}/doctor/${id}`);
        return response.data.length > 0 ? response.data : [];
    } catch (error) {
        console.error(error);
        return { error: true, message: "Error al cargar los horarios por Doctor" };
    }
};

export const findSchedulesByDay = async (day) => {
    try {
        const response = await axios.get(`${URL}/day/${day}`);
        return response.data.length > 0 ? response.data : [];
    } catch (error) {
        if (error.response) {
            console.error("Conflicto de horario:", error.response.data);
        }
        console.error(error);
        return { error: true, message: "Error al cargar los horarios por Dia" }
    }    
};

export const saveSchedule = async (schedule) => {
    try {
        return await axios.post(URL, schedule);
    } catch (error) {
        throw error;
    }
};

export const updateSchedule = async (schedule) => {
    try {
        return await axios.put(`${URL}/${schedule.id}`, schedule);
    } catch (error) {
        throw error;
    }
};

export const removeSchedule = async (id) => {
    try {
        await axios.delete(`${URL}/${id}`);
    } catch (error) {
        throw error;
    }
};
