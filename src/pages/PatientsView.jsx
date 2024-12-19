import { useContext, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { PatientModal } from "../components/PatientModal";
import { PatientsList } from "../components/PatientsList";
import { PatientContext } from "../context/PatientContext";

export const PatientsView = () => {
    const {
        patients,
        visibleForm,
        isLoading,

        handlerOpenForm,
        getPatients
    } = useContext(PatientContext);

    useEffect(() => {
        getPatients();
    }, []);

    return (
        <div className="container-fluid pb-4 px-3">
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="text-center">
                        <div className="spinner-border text-primary mb-3" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <h5 className="text-secondary">Cargando información de pacientes...</h5>
                    </div>
                </div>
            ) : (
                <>
                    {visibleForm && <PatientModal />}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fs-3 fw-bold text-primary d-flex align-items-center">
                            <i className="fas fa-users me-3"></i>Datos de Pacientes
                        </h3>
                        <button
                            className="btn btn-outline-success px-4 py-2 d-flex align-items-center"
                            onClick={handlerOpenForm}>
                            <i className="fas fa-plus me-2"></i>Nuevo Paciente
                        </button>
                    </div>
                    <div className="card shadow-lg border-0 rounded">
                        <div className="card-header bg-primary text-white">
                            <h5 className="m-0 d-flex justify-content-between align-items-center">
                                Lista de Pacientes
                                <span className="badge bg-light text-primary px-3 py-2 fs-6">
                                    {patients.length} {patients.length === 1 ? "paciente" : "pacientes"}
                                </span>
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            {patients.length === 0 ? (
                                <div className="alert alert-warning text-center">
                                    <i className="fas fa-exclamation-circle me-2"></i>
                                    No hay pacientes registrados en el sistema
                                </div>
                            ) : (
                                <PatientsList />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
