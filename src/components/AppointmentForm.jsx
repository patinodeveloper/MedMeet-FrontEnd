import { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { AppointmentContext } from "../context/AppointmentContext";
import { DoctorContext } from "../context/DoctorContext";
import { PatientContext } from "../context/PatientContext";
import { SpecialtyContext } from "../context/SpecialtyContext";

export const AppointmentForm = ({ appointmentSelected, handlerCloseForm }) => {
    const { handlerAddAppointment, errors, initialAppointmentForm } = useContext(AppointmentContext);
    const [appointmentForm, setAppointmentForm] = useState(initialAppointmentForm);

    const { id, doctor, patient, date, startTime, endTime, status } = appointmentForm;

    const { doctors, getDoctors, getDoctorsBySpecialty } = useContext(DoctorContext);
    const { patients, getPatients } = useContext(PatientContext);
    const { specialties, getSpecialties } = useContext(SpecialtyContext);

    useEffect(() => {
        setAppointmentForm({ ...appointmentSelected });
    }, [appointmentSelected]);

    useEffect(() => {
        getSpecialties();
        getPatients();
    }, []);

    useEffect(() => {
        // Si no se selecciona una especialidad, se cargan todos los doctores
        if (!appointmentForm.specialty) {
            getDoctors();
        } else {
            getDoctorsBySpecialty(appointmentForm.specialty);
        }
    }, [appointmentForm.specialty]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setAppointmentForm({
            ...appointmentForm,
            [name]: value,
        });
    };

    const onDoctorChange = ({ target }) => {
        const selectedDoctor = doctors.find((d) => d.id === parseInt(target.value));
        setAppointmentForm({
            ...appointmentForm,
            doctor: selectedDoctor,
        });
    };

    const onPatientChange = ({ target }) => {
        const selectedPatient = patients.find((p) => p.id === parseInt(target.value));
        setAppointmentForm({
            ...appointmentForm,
            patient: selectedPatient,
        });
    };

    const onSubmit = (evt) => {
        evt.preventDefault();

        if (!doctor || !patient || !date || !startTime || !endTime || !status) {
            Swal.fire({
                title: "Error de Validación",
                text: "Por favor, completa todos los campos del formulario!",
                icon: "error",
            });
            return;
        }

        if (startTime >= endTime) {
            Swal.fire({
                title: "Error de Horario",
                text: "La hora de inicio no puede ser mayor o igual que la hora de fin!",
                icon: "error",
            });
            return;
        }

        handlerAddAppointment(appointmentForm);
    };

    const onCloseForm = () => {
        handlerCloseForm();
        setAppointmentForm(initialAppointmentForm);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label className="form-label">Especialidad</label>
                <select
                    className="form-select"
                    name="specialty"
                    value={appointmentForm.specialty || ""}
                    onChange={onInputChange}
                >
                    <option value="">Seleccionar especialidad</option>
                    {specialties.length > 0 ? (
                        specialties.map(spec => (
                            <option key={spec.id} value={spec.id}>
                                {spec.name}
                            </option>
                        ))
                    ) : (
                        <option disabled>No hay especialidades disponibles</option>
                    )}
                </select>
                <p className="text-danger">{errors?.specialty}</p>
            </div>

            <div className="mb-3">
                <label className="form-label">Doctor</label>
                <select
                    className="form-select"
                    name="doctor"
                    value={doctor?.id || ''}
                    onChange={onDoctorChange}
                >
                    <option value="">Seleccionar doctor</option>
                    {doctors.length > 0 ? (
                        doctors.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.firstName} {d.lastName}
                            </option>
                        ))
                    ) : (
                        <option disabled>No hay doctores disponibles</option>
                    )}
                </select>
                <p className="text-danger">{errors?.doctor}</p>
            </div>

            <div className="mb-3">
                <label className="form-label">Paciente</label>
                <select
                    className="form-select"
                    name="patient"
                    value={patient?.id || ''}
                    onChange={onPatientChange}
                >
                    <option value="">Seleccionar paciente</option>
                    {patients.length > 0 ? (
                        patients.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.firstName} {p.lastName}
                            </option>
                        ))
                    ) : (
                        <option disabled>No hay pacientes disponibles</option>
                    )}
                </select>
                <p className="text-danger">{errors?.patient}</p>
            </div>

            <div className="mb-3">
                <label className="form-label">Fecha</label>
                <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={date || ""}
                    onChange={onInputChange}
                />
                <p className="text-danger">{errors?.date}</p>
            </div>

            <div className="mb-3">
                <label className="form-label">Hora de Inicio</label>
                <input
                    type="time"
                    className="form-control"
                    name="startTime"
                    value={startTime || ""}
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
                    value={endTime || ""}
                    onChange={onInputChange}
                />
                <p className="text-danger">{errors?.endTime}</p>
            </div>

            <div className="mb-3">
                <label className="form-label">Estatus</label>
                <select
                    className="form-select"
                    name="status"
                    value={status || ''}
                    onChange={onInputChange}
                >
                    <option value="">Seleccionar Estatus</option>
                    <option value="Confirmada">Confirmada</option>
                    <option value="Cancelada">Cancelada</option>
                    <option value="Pendiente">Pendiente</option>
                </select>
                <p className="text-danger">{errors?.status}</p>
            </div>

            <div className="modal-footer">
                <button
                    type="submit"
                    className={id > 0 ? "btn btn-warning" : "btn btn-primary"}
                >
                    {id > 0 ? "Editar" : "Crear"}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary mx-2"
                    onClick={onCloseForm}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};
