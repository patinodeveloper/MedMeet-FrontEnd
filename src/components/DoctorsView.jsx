import { useContext, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { DoctorModal } from "./DoctorModal";
import { DoctorsList } from "./DoctorsList";
import { DoctorContext } from "../context/DoctorContext";

export const DoctorsView = ({ title }) => {
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
        <>
            {isLoading ? (
                <div className="alert alert-info">Cargando...</div>
            ) : (
                <>
                    {!visibleForm ||
                        <DoctorModal />}
                    <h3 className="fs-5">{title}</h3>
                    <div className="mb-3 d-flex justify-content-end">
                        {visibleForm || <button
                            className="btn btn-primary"
                            onClick={handlerOpenForm}>
                            <i className="fas fa-plus me-2"></i> Agregar Doctor
                        </button>}
                    </div>
                    {
                        doctors.length === 0
                            ? <div className="alert alert-warning">No hay usuarios en el sistema </div>
                            : <DoctorsList />
                    }
                </>
            )}
        </>
    );
};
