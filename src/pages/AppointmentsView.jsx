import { useContext, useEffect } from "react";
import { AppointmentContext } from "../context/AppointmentContext";
import { AppointmentModal } from "../components/AppointmentModal";
import { AppointmentsList } from "../components/AppointmentsList";

export const AppointmentsView = () => {
    const {
        appointments,
        visibleForm,
        isLoading,
        
        handlerOpenForm,
        getAppointments
    } = useContext(AppointmentContext);

    useEffect(() => {
        getAppointments();
    }, []);

    return (
        <div className="container-fluid pb-4 px-3">
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="text-center">
                        <div className="spinner-border text-primary mb-3" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <h5 className="text-secondary">Cargando citas...</h5>
                    </div>
                </div>
            ) : (
                <>
                    {visibleForm && <AppointmentModal />}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fs-3 fw-bold text-primary d-flex align-items-center">
                            <i className="fas fa-calendar-check me-3"></i>Gestión de Citas
                        </h3>
                        <button
                            className="btn btn-outline-success px-4 py-2 d-flex align-items-center"
                            onClick={handlerOpenForm}>
                            <i className="fas fa-plus me-2"></i>Nueva Cita
                        </button>
                    </div>
                    <div className="card shadow-lg border-0 rounded">
                        <div className="card-header bg-primary text-white">
                            <h5 className="m-0 d-flex justify-content-between align-items-center">
                                Lista de Citas
                                <span className="badge bg-light text-primary px-3 py-2 fs-6">
                                    {appointments.length} {appointments.length === 1 ? "cita" : "citas"}
                                </span>
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            {appointments.length === 0 ? (
                                <div className="alert alert-warning text-center">
                                    <i className="fas fa-exclamation-circle me-2"></i>
                                    No hay citas registradas
                                </div>
                            ) : (
                                <AppointmentsList />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
