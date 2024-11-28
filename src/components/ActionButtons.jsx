import { useContext } from "react";
import { DoctorContext } from "../context/DoctorContext";

export const ActionButtons = ({ doctor }) => {
    // pasar doctor
    const { handlerRemoveDoctor, handlerDoctorSelectedForm } = useContext(DoctorContext);

    return (
        <div className="d-flex gap-2">
            <button
                className="btn btn-warning"
                onClick={() => handlerDoctorSelectedForm(doctor)}
            >
                <i className="fas fa-edit"></i>
            </button>
            <button
                className="btn btn-danger"
                onClick={() => handlerRemoveDoctor(id)}
            >
                <i className="fas fa-trash"></i>
            </button>
        </div>
    )
}