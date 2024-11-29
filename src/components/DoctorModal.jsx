import { useContext } from "react";
import Swal from "sweetalert2";
import { DoctorForm } from "./DoctorForm";
import { DoctorContext } from "../context/DoctorContext";

export const DoctorModal = () => {

    const { doctorSelected, handlerCloseForm } = useContext(DoctorContext);

    return (
        <div className="open-modal animation fadeIn">
            <div className="modal" style={{ display: "block" }} tabIndex={-1}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {doctorSelected.id > 0 ? "Editar Doctor" : "Agregar Doctor"}
                            </h5>
                            <button type="button" className="btn-close" onClick={handlerCloseForm}></button>
                        </div>
                        <div className="modal-body">
                            <DoctorForm
                                doctorSelected={doctorSelected}
                                handlerCloseForm={handlerCloseForm} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
