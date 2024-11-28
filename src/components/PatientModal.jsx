import { useContext } from "react";
import { PatientContext } from "../context/PatientContext";
import { PatientForm } from "./PatientForm";

export const PatientModal = () => {
    const { patientSelected, handlerCloseForm } = useContext(PatientContext);

    return (
        <div className="modal fade show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {patientSelected.id > 0 ? "Editar Paciente" : "Agregar Paciente"}
                        </h5>
                        <button type="button" className="btn-close" onClick={handlerCloseForm}></button>
                    </div>
                    <PatientForm
                        patientSelected={patientSelected}
                        handlerCloseForm={handlerCloseForm}
                    />
                </div>
            </div>
        </div>
    );
};
