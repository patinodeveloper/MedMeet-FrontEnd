import { useContext } from "react";
import { ScheduleForm } from "./ScheduleForm";
import { ScheduleContext } from "../context/ScheduleContext";

export const ScheduleModal = () => {
    const { scheduleSelected, handlerCloseForm } = useContext(ScheduleContext);

    return (
        <div className="open-modal animation fadeIn">
            <div className="modal" style={{ display: "block" }} tabIndex={-1}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {scheduleSelected.id > 0 ? "Editar Horario" : "Agregar Horario"}
                            </h5>
                            <button type="button" className="btn-close" onClick={handlerCloseForm}></button>
                        </div>
                        <div className="modal-body">
                            <ScheduleForm
                                scheduleSelected={scheduleSelected}
                                handlerCloseForm={handlerCloseForm}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
