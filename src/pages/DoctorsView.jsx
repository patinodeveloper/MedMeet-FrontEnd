import { useContext, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { DoctorModal } from "../components/DoctorModal";
import { DoctorsList } from "../components/DoctorsList";
import { DoctorContext } from "../context/DoctorContext";

export const DoctorsView = () => {
    const {
        doctors,
        visibleForm,
        isLoading,

        handlerOpenForm,
        getDoctors
    } = useContext(DoctorContext);

    useEffect(() => {
        getDoctors();
    }, []);

    return (
        <div className="container-fluid pb-4 px-3">
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="text-center">
                        <div className="spinner-border text-primary mb-3" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <h5 className="text-secondary">Cargando información de doctores...</h5>
                    </div>
                </div>
            ) : (
                <>
                    {visibleForm && <DoctorModal />}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fs-3 fw-bold text-primary d-flex align-items-center">
                            <i className="fas fa-user-md me-3"></i>Datos de Doctores
                        </h3>
                        <button
                            className="btn btn-outline-success px-4 py-2 d-flex align-items-center"
                            onClick={handlerOpenForm}>
                            <i className="fas fa-plus me-2"></i>Nuevo Doctor
                        </button>
                    </div>
                    <div className="card shadow-lg border-0 rounded">
                        <div className="card-header bg-primary text-white">
                            <h5 className="m-0 d-flex justify-content-between align-items-center">
                                Lista de Doctores
                                <span className="badge bg-light text-primary px-3 py-2 fs-6">
                                    {doctors.length} {doctors.length === 1 ? "doctor" : "doctores"}
                                </span>
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            {doctors.length === 0 ? (
                                <div className="alert alert-warning text-center">
                                    <i className="fas fa-exclamation-circle me-2"></i>
                                    No hay doctores registrados en el sistema
                                </div>
                            ) : (
                                <DoctorsList />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
