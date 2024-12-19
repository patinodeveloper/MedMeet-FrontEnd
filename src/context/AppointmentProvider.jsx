import { useAppointments } from "../hooks/useAppointments";
import { AppointmentContext } from "./AppointmentContext";

export const AppointmentProvider = ({ children }) => {

    const {
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
    } = useAppointments();

    return (
        <AppointmentContext.Provider value={
            {
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
            }
        }>
            {children}
        </AppointmentContext.Provider>
    );
};
