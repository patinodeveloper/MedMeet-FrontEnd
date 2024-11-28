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
        <>
            {isLoading ? (
                <div className="alert alert-info">Cargando pacientes...</div>
            ) : (
                <>
                    {!visibleForm || <PatientModal />}
                    <h3 className="fs-5">Datos de los pacientes</h3>
                    <div className="mb-3 d-flex justify-content-end">
                        {visibleForm || (
                            <button
                                className="btn btn-primary"
                                onClick={handlerOpenForm}>
                                <i className="fas fa-plus me-2"></i> Agregar Paciente
                            </button>
                        )}
                    </div>
                    {
                        patients.length === 0
                            ? <div className="alert alert-warning">No hay pacientes en el sistema</div>
                            : <PatientsList />
                    }
                </>
            )}
        </>
    );
};
