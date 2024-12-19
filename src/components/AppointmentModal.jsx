import { useContext } from "react";
import { AppointmentForm } from "./AppointmentForm";
import { AppointmentContext } from "../context/AppointmentContext";

export const AppointmentModal = () => {

    const { appointmentSelected, handlerCloseForm } = useContext(AppointmentContext);

    return (
        <div className="open-modal animation fadeIn">
            <div className="modal" style={{ display: "block" }} tabIndex={-1}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {appointmentSelected.id > 0 ? "Editar Cita" : "Agregar Cita"}
                            </h5>
                            <button type="button" className="btn-close" onClick={handlerCloseForm}></button>
                        </div>
                        <div className="modal-body">
                            <AppointmentForm
                                appointmentSelected={appointmentSelected}
                                handlerCloseForm={handlerCloseForm} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
