import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ScheduleContext } from "../context/ScheduleContext";
import { SchedulesList } from "../components/SchedulesList";

export const SchedulesDocView = () => {
    const { id } = useParams();
    const {
        schedules,
        visibleForm,
        isLoading,

        handlerOpenForm,
    } = useContext(ScheduleContext);

    const {
        getSchedulesByDoctorId
    } = useContext(ScheduleContext);

    useEffect(() => {
        getSchedulesByDoctorId(id);
    }, [id]);

    return (
        <div className="container py-5">
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="text-center">
                        <div className="spinner-border text-primary mb-3" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <h5 className="text-secondary">Cargando información de horarios...</h5>
                    </div>
                </div>
            ) : (
                <>
                    {visibleForm && <ScheduleModal />}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fs-3 fw-bold text-primary d-flex align-items-center">
                            <i className="fas fa-calendar-alt me-3"></i>Datos de Horarios
                        </h3>
                        {!visibleForm && (
                            <button
                                className="btn btn-outline-success px-4 py-2 d-flex align-items-center"
                                onClick={handlerOpenForm}>
                                <i className="fas fa-plus me-2"></i>Nuevo Horario
                            </button>
                        )}
                    </div>
                    <div className="card shadow-lg border-0 rounded">
                        <div className="card-header bg-primary text-white">
                            <h5 className="m-0 d-flex justify-content-between align-items-center">
                                Lista de Horarios
                                <span className="badge bg-light text-primary px-3 py-2 fs-6">
                                    {schedules.length} {schedules.length === 1 ? "horario" : "horarios"}
                                </span>
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            {schedules.length === 0 ? (
                                <div className="alert alert-warning text-center">
                                    <i className="fas fa-exclamation-circle me-2"></i>
                                    No hay horarios registrados en el sistema
                                </div>
                            ) : (
                                <SchedulesList />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}