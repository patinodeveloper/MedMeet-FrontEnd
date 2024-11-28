import { useContext } from "react";
import { PatientContext } from "../context/PatientContext";

export const ActionButtonsPatient = ({ patient }) => {
    
    const { handlerRemovePatient, handlerPatientSelectedForm } = useContext(PatientContext);

    return (
        <div className="d-flex gap-2">
            <button
                className="btn btn-warning"
                onClick={() => handlerPatientSelectedForm(patient)}
            >
                <i className="fas fa-edit"></i>
            </button>
            <button
                className="btn btn-danger"
                onClick={() => handlerRemovePatient(patient.id)}
            >
                <i className="fas fa-trash"></i>
            </button>
        </div>
    )
}