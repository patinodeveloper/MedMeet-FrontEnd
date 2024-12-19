import { useReducer, useState } from "react";
import { appointmentReducer } from "../reducers/appointmentReducer";
import Swal from "sweetalert2";
import { findAllAppointments, saveAppointment, updateAppointment, removeAppointment, findAppointmentsByDoctorAndDate, } from "../api/services/appointmentServices";
import { useDoctors } from "./useDoctors";
import { usePatients } from "./usePatients";

const initialAppointments = [];
const initialAppointmentForm = {
    id: 0,
    doctor: { id: 0, firstName: '' },
    patient: { id: 0, firstName: '' },
    date: '',
    startTime: '',
    endTime: '',
    status: 'Pendiente',
};
const initialErrors = {
    doctor: { id: 0, firstName: '' },
    patient: { id: 0, lastName: '' },
    date: '',
    startTime: '',
    endTime: '',
    status: 'Pendiente',
};

export const useAppointments = () => {
    const [appointments, dispatch] = useReducer(appointmentReducer, initialAppointments);
    const [appointmentSelected, setAppointmentSelected] = useState(initialAppointmentForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState(initialErrors);
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const { doctors } = useDoctors();
    const { patients } = usePatients();

    const getAppointments = async () => {
        setIsLoading(true);
        try {
            const result = await findAllAppointments();
            dispatch({ 
                type: "loadAppointments",
                payload: result});
            setErrors({});
        } catch (error) {
            console.error("Error al cargar las citas", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlerAddAppointment = async (appointment) => {
        console.log(appointment);
        
        const type = appointment.id === 0 ? "addAppointment" : "updateAppointment";
        let response;
        try {
            if (appointment.id === 0) {
                response = await saveAppointment({
                    ...appointment,
                    doctorId: appointment.doctor.id,
                    patientId: appointment.patient.id
                });
            } else {
                response = await updateAppointment({
                    ...appointment,
                    doctorId: appointment.doctor.id,
                    patientId: appointment.patient.id
                });
            }

            dispatch({ 
                type: type, 
                payload: response.data, 
            });

            Swal.fire(
                appointment.id === 0 ? "Cita Registrada" : "Cita Actualizada",
                appointment.id === 0
                    ? "La cita ha sido registrada con éxito"
                    : "La cita ha sido actualizada con éxito",
                "success"
            );
            handlerCloseForm();
            setSearchText("");
        } catch (error) {
            if (error.response?.status === 400) {
                setErrors(error.response.data);
            } else {
                console.error("Error al guardar la cita", error);
                throw error;
            }
        }
    };

    const handlerRemoveAppointment = async (id) => {
        Swal.fire({
            title: "¿Está seguro que desea eliminar?",
            text: "Esta acción es irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    removeAppointment(id);

                    dispatch({ 
                        type: "removeAppointment",
                        payload: id 
                    });
                    Swal.fire({
                            title: "CIta Eliminada!",
                            text: "La cita se ha eliminado exitosamente",
                            icon: "success"
                    });
                    setSearchText("");
                } catch (error) {
                    console.error("Error al eliminar la cita", error);
                }
            }
        });
    };

    const handlerAppointmentSelectedForm = (appointment) => {
        if (!appointment) {
            console.error("Error: La cita seleccionada no está definida.");
            return;
        }
        setVisibleForm(true);
        setAppointmentSelected({
            ...appointment,
            patient: appointment.patient || { id: 0, firstName: "" },
            doctor: appointment.doctor || {id: 0, firstName: ""}
        });
    };

    const handlerOpenForm = () => {
        setVisibleForm(true);
    };

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setAppointmentSelected(initialAppointmentForm);
        setErrors({});
    };

    const filteredAppointments = appointments.filter(appointment =>
        `${appointment.patient?.firstName || ''} ${appointment.patient?.lastName || ''}`.toLowerCase().includes(searchText.toLowerCase()) ||
        `${appointment.doctor?.firstName || ''} ${appointment.doctor?.lastName || ''}`.toLowerCase().includes(searchText.toLowerCase()) ||
        (appointment.status || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (appointment.date || '').toLowerCase().includes(searchText.toLowerCase())
    );    

    const getAppointmentsByDoctorAndDate = async (doctorId, date) => {
        try {
        const result = await findAppointmentsByDoctorAndDate(doctorId, date);
        dispatch({ type: "loadAppointments", payload: result });
        } catch (error) {
        console.error("Error al obtener citas por doctor y fecha", error);
        }
    };

    return {
        appointments,
        appointmentSelected,
        initialAppointmentForm,
        visibleForm,
        errors,
        isLoading,
        doctors,
        patients,
        filteredAppointments,
        searchText,
        setSearchText,

        getAppointments,
        handlerAddAppointment,
        handlerRemoveAppointment,
        handlerAppointmentSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getAppointmentsByDoctorAndDate,
    };
};
