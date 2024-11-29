import { useContext, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { SpecialtyModal } from "../components/SpecialtyModal";
import { SpecialtiesList } from "../components/SpecialtiesList";
import { SpecialtyContext } from "../context/SpecialtyContext";

export const SpecialtiesView = () => {
    const {
        specialties,
        visibleForm,
        isLoading,
        handlerOpenForm,
        getSpecialties
    } = useContext(SpecialtyContext);

    useEffect(() => {
        getSpecialties();
    }, []);

    return (
        <div className="container my-5">
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="text-center">
                        <div className="spinner-border text-primary mb-3" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <h5 className="text-secondary">Cargando información de especialidades...</h5>
                    </div>
                </div>
            ) : (
                <>
                    {visibleForm && <SpecialtyModal />}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fs-3 fw-bold text-primary d-flex align-items-center">
                            <i className="fas fa-stethoscope me-3"></i>Datos de Especialidades
                        </h3>
                        {!visibleForm && (
                            <button
                                className="btn btn-outline-success px-4 py-2 d-flex align-items-center"
                                onClick={handlerOpenForm}>
                                <i className="fas fa-plus me-2"></i> Nueva Especialidad
                            </button>
                        )}
                    </div>
                    <div className="card shadow-lg border-0 rounded">
                        <div className="card-header bg-primary text-white">
                            <h5 className="m-0 d-flex justify-content-between align-items-center">
                                Lista de Especialidades
                                <span className="badge bg-light text-primary px-3 py-2 fs-6">
                                    {specialties.length} {specialties.length === 1 ? "especialidad" : "especialidades"}
                                </span>
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            {specialties.length === 0 ? (
                                <div className="alert alert-warning text-center">
                                    <i className="fas fa-exclamation-circle me-2"></i>
                                    No hay especialidades registradas en el sistema
                                </div>
                            ) : (
                                <SpecialtiesList />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
