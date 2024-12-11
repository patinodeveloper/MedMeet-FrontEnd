import axios from "axios";
import { API_BASE_URL } from "../config";

const URL = `${API_BASE_URL}/schedules`;

export const findAllSchedules = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const findSchedulesByDoctorId = async (id) => {
    try {
        const response = await axios.get(`${URL}/doctor/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const findSchedulesByDay = async (day) => {
    try {
        const response = await axios.get(`${URL}/day/${day}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Conflicto de horario:", error.response.data);
        }
        console.error("Error al obtener los horarios por día:", error);
        throw error;
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
