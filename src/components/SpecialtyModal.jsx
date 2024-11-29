import { useContext } from "react"
import { SpecialtyContext } from "../context/SpecialtyContext";
import { SpecialtyForm } from "./SpecialtyForm";
export const SpecialtyModal = () => {

    const { specialtySelected, handlerCloseForm } = useContext(SpecialtyContext);

    return (
        <div className="modal fade show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">

                        <h5 className="modal-title">
                            {specialtySelected.id > 0 ? "Editar Especialidad" : "Agregar Especialidad"}
                        </h5>
                        <button type="button" className="btn-close" onClick={handlerCloseForm}></button>
                    </div>
                    <SpecialtyForm
                        specialtySelected={specialtySelected}
                        handlerCloseForm={handlerCloseForm}
                    />
                </div>
            </div>
        </div>
    )
}