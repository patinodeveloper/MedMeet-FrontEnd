import { useState, useReducer } from 'react';
import { scheduleReducer } from "../reducers/scheduleReducer";
import Swal from "sweetalert2";
import { findAllSchedules, saveSchedule, updateSchedule, removeSchedule, findSchedulesByDoctorId, findSchedulesByDay } from "../api/services/scheduleServices";

const initialSchedules = [];
const initialScheduleForm = {id: 0, doctor: { }, day: "", startTime: "", endTime: "" };
const initialErrors = { 
    doctor: { },
    day: "",
    startTime: "",
    endTime: "",
};

export const useSchedules = () => {
    const [schedules, dispatch] = useReducer(scheduleReducer, initialSchedules);
    const [scheduleSelected, setScheduleSelected] = useState(initialScheduleForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState(initialErrors);
    
    const [isLoading, setIsLoading] = useState(false); 
    const [searchText, setSearchText] = useState("");

    const getSchedules = async () => {
        setIsLoading(true);
        try {
            const result = await findAllSchedules();
            dispatch({
                type: "loadSchedules",
                payload: result});
            setErrors({});
        } catch (error) {
            console.error("Error al cargar los horarios", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getSchedulesByDoctorId = async (id) => {
        setIsLoading(true);
        try {
            const result = await findSchedulesByDoctorId(id);
            if (result.length === 0) {
                Swal.fire({
                    title: "Sin horarios",
                    text: "Este doctor aún no tiene horarios registrados.",
                    icon: "info",
                    confirmButtonText: "Entendido",
                });
            }    
            dispatch({
                type: "loadSchedules",
                payload: result
            });
            setErrors({});
        } catch (error) {
            console.error("Error al cargar los horarios", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlerAddSchedule = async (schedule) => {
        console.log(schedule);
        console.log(schedule.id);
        const type = (schedule.id === 0) ? "addSchedule" : "updateSchedule";
        let response;
        try {
            if (schedule.id === 0) {
                console.log('Save');
                response = await saveSchedule({
                    ...schedule,
                    doctorId: schedule.doctor.id
                });
            } else {
                console.log('Update');
                response = await updateSchedule({
                    ...schedule,
                    doctorId: schedule.doctor.id
                });
            }

            dispatch({
                type: type,
                payload: response.data,
            });

            Swal.fire(
                (schedule.id === 0) ? "Horario Registrado" : "Horario Actualizado",
                (schedule.id === 0)
                    ? "El horario ha sido agregado con éxito"
                    : "El horario ha sido actualizado con éxito",
                "success"
            );
            handlerCloseForm();
            setSearchText("");
        } catch (error) {
            if (error.response?.status === 400) {
                setErrors(error.response.data);
            } else {
                console.error("Error al guardar el horario", error);
                throw error;
            }
        }
    };

    const handlerRemoveSchedule = async (id) => {
        Swal.fire({
            title: "¿Está seguro que desea eliminar?",
            text: "Esta acción es irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                // Elimina el horario
                removeSchedule(id);
                
                dispatch({
                    type: 'removeSchedule',
                    payload: id
                })
                Swal.fire({
                    title: "Horario Eliminado!",
                    text: "El Horario se ha eliminado exitosamente",
                    icon: "success"
                });
                setSearchText("");
            }
        });
    };

    const handlerScheduleSelectedForm = (schedule) => {
        if (!schedule) {
            console.error("Error!, El horario seleccionado no esta definido.");
            return;
        }
        setVisibleForm(true);
        setScheduleSelected({
            ...schedule,
        });
    };

    const handlerOpenForm = () => {
        setVisibleForm(true);
    };

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setScheduleSelected(initialScheduleForm);
        setErrors({});
    };

    const filteredSchedules = schedules.filter(schedule =>
        `${schedule.doctor.firstName} ${schedule.doctor.lastName}`.toLowerCase().includes(searchText.toLowerCase()) ||
        schedule.day.toLowerCase().includes(searchText.toLowerCase())
    );

    const checkScheduleConflict = async (day, startTime, endTime, scheduleId) => {
        try {
            const schedules = await findSchedulesByDay(day);
            for (const schedule of schedules) {
                if (schedule.id !== scheduleId) {
                    if (
                        (startTime < schedule.endTime && endTime > schedule.startTime) ||
                        (startTime === schedule.startTime || endTime === schedule.endTime)
                    ) {
                        return true;
                    }
                }
            }
            return false;
        } catch (error) {
            console.error("Error al validar conflicto de horarios", error);
            return false;
        }
    };

    return {
        schedules,
        scheduleSelected,
        initialScheduleForm,
        visibleForm,
        errors,
        isLoading,
        searchText,
        setSearchText,
        filteredSchedules,

        handlerAddSchedule,
        handlerRemoveSchedule,
        handlerScheduleSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getSchedules,
        getSchedulesByDoctorId,
        checkScheduleConflict
    };
};

