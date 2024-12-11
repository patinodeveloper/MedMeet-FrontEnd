import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ScheduleContext } from "../context/ScheduleContext";
import { DoctorContext } from "../context/DoctorContext";
import { SpecialtyContext } from "../context/SpecialtyContext";

export const ScheduleForm = ({ scheduleSelected, handlerCloseForm }) => {

    const { handlerAddSchedule, initialScheduleForm, errors, checkScheduleConflict } = useContext(ScheduleContext);
    const [scheduleForm, setScheduleForm] = useState(initialScheduleForm);

    const { id, doctor, day, startTime, endTime } = scheduleForm;
    const { doctors, getDoctors, getDoctorsBySpecialty } = useContext(DoctorContext);
    const { specialties, getSpecialties } = useContext(SpecialtyContext);

    useEffect(() => {
        setScheduleForm({
            ...scheduleSelected,
        });
    }, [scheduleSelected]);

    useEffect(() => {
        getSpecialties();
    }, []);

    useEffect(() => {
        // Si no se selecciona ninguna especialidad, cargamos todos los doctores
        if (!scheduleForm.specialty) {
            getDoctors();
        } else {
            getDoctorsBySpecialty(scheduleForm.specialty);
        }
    }, [scheduleForm.specialty]);


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setScheduleForm({
            ...scheduleForm,
            [name]: value
        });
    };

    const onDoctorChange = ({ target }) => {
        const selectedDoctor = doctors.find(d => d.id === parseInt(target.value));
        setScheduleForm({
            ...scheduleForm,
            doctor: selectedDoctor
        });
    };

    const onSubmit = async (evt) => {
        evt.preventDefault();
        console.log("Schedule a enviar:", scheduleForm);

        if (!day || !startTime || !endTime || !doctor || !doctor.id) {
            Swal.fire({
                title: 'Error de Validación',
                text: 'Por favor, completa todos los campos del formulario!',
                icon: "error",
            });
            return;
        }

        if (new Date(`1970-01-01T${startTime}:00`) >= new Date(`1970-01-01T${endTime}:00`)) {
            Swal.fire({
                title: 'Error de Validación',
                text: 'La hora de inicio debe ser anterior a la hora de fin.',
                icon: "error",
            });
            return;
        }

        const isConflict = await checkScheduleConflict(day, startTime, endTime, scheduleForm.id);
        if (isConflict) {
            Swal.fire({
                title: 'Conflicto de Horarios',
                text: 'El horario se cruza con otro existente para este doctor.',
                icon: "error",
            });
            return;
        }

        handlerAddSchedule(scheduleForm);
    };

    const onCloseForm = () => {
        handlerCloseForm();
        setScheduleForm(initialScheduleForm);
    };

    return (
        <form onSubmit={onSubmit}>
            {id === 0 && (
                <div className="mb-3">
                    <label className="form-label">Especialidad</label>
                    <select
                        className="form-select"
                        name="specialty"
                        value={scheduleForm.specialty || ""}
                        onChange={onInputChange}
                    >
                        <option value="">Seleccionar especialidad</option>
                        {specialties.map(spec => (
                            <option key={spec.id} value={spec.id}>
                                {spec.name}
                            </option>
                        ))}
                    </select>
                    <p className="text-danger">{errors?.specialty}</p>
                </div>
            )}
            <div className="mb-3">
                <label className="form-label">Doctor</label>
                <select
                    className="form-select"
                    name="doctor"
                    value={doctor?.id || ""}
                    onChange={onDoctorChange}
                    disabled={id > 0}
                >
                    <option value="">Seleccionar doctor</option>
                    {doctors.map(doc => (
                        <option key={doc.id} value={doc.id}>
                            {`${doc.firstName} ${doc.lastName}`}
                        </option>
                    ))}
                </select>
                <p className="text-danger">{errors?.doctor}</p>
            </div>
            <div className="mb-3">
                <label className="form-label">Día de la Semana</label>
                <select
                    className="form-select"
                    name="day"
                    value={day || ''}
                    onChange={onInputChange}
                >
                    <option value="">Seleccionar día</option>
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                </select>
                <p className="text-danger">{errors?.day}</p>
            </div>

            <div className="mb-3">
                <label className="form-label">Hora de Inicio</label>
                <input
                    type="time"
                    className="form-control"
                    name="startTime"
                    value={startTime || ''}
                    onChange={onInputChange}
                />
                <p className="text-danger">{errors?.startTime}</p>
            </div>

            <div className="mb-3">
                <label className="form-label">Hora de Fin</label>
                <input
                    type="time"
                    className="form-control"
                    name="endTime"
                    value={endTime || ''}
                    onChange={onInputChange}
                />
                <p className="text-danger">{errors?.endTime}</p>
            </div>
            <div className="modal-footer">
                <button
                    type="submit"
                    className={id > 0 ? "btn btn-warning" : "btn btn-primary"}
                >
                    {id > 0 ? "Editar" : "Crear"}
                </button>

                {!handlerCloseForm || <button
                    type="button"
                    className="btn btn-secondary mx-2"
                    onClick={() => onCloseForm()}>
                    Cancelar
                </button>}
            </div>
        </form>
    );
};
