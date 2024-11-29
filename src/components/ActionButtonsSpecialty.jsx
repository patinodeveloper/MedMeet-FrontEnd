import { useContext } from "react";
import { SpecialtyContext } from "../context/SpecialtyContext";

export const ActionButtonsSpecialty = ({ specialty }) => {

    const { handlerRemoveSpecialty, handlerSpecialtySelectedForm } = useContext(SpecialtyContext);

    return (
        <div className="d-flex gap-2">
            <button
                className="btn btn-warning"
                onClick={() => handlerSpecialtySelectedForm(specialty)}
            >
                <i className="fas fa-edit"></i>
            </button>
            <button
                className="btn btn-danger"
                onClick={() => handlerRemoveSpecialty(specialty.id)}
            >
                <i className="fas fa-trash"></i>
            </button>
        </div>
    )
}