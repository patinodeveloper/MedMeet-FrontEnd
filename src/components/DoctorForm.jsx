import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { DoctorContext } from "../context/DoctorContext";
import { SpecialtyContext } from "../context/SpecialtyContext";

export const DoctorForm = ({ doctorSelected, handlerCloseForm }) => {

    const { handlerAddDoctor, initialDoctorForm, errors } = useContext(DoctorContext);

    const [doctorForm, setDoctorForm] = useState(initialDoctorForm);

    const { id, firstName, lastName, email, specialty } = doctorForm;

    const { specialties, getSpecialties } = useContext(SpecialtyContext);


    useEffect(() => {
        setDoctorForm({
            ...doctorSelected,
        });
    }, [doctorSelected]);

    useEffect(() => {
        getSpecialties();
    }, []);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setDoctorForm({
            ...doctorForm,
            [name]: value
        });
    }

    const onSpecialtyChange = ({ target }) => {
        const selectedSpecialty = specialties.find(s => s.id === parseInt(target.value));
        setDoctorForm({
            ...doctorForm,
            specialty: selectedSpecialty
        });
    };

    const onSubmit = (evt) => {
        evt.preventDefault();

        if (!firstName || !lastName || !email || !specialty) {
            Swal.fire({
                title: 'Error de Validacion',
                text: 'Por favor, completa todos los campos del formulario!',
                icon: "error",
                // timer: 2000
            });
            return;
        }

        console.log('Enviando formulario');

        handlerAddDoctor(doctorForm);
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setDoctorForm(initialDoctorForm);
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={onInputChange}
                />
                <p className="text-danger">{errors?.firstName}</p>
            </div>
            <div className="mb-3">
                <label className="form-label">Apellidos</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={onInputChange}
                />
                <p className="text-danger">{errors?.lastName}</p>
            </div>

            <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                />
                <p className="text-danger">{errors?.email}</p>
            </div>

            <div className="mb-3">
                <label className="form-label">Especialidad</label>
                <select
                    className="form-select"
                    name="specialty"
                    value={specialty?.id || ''}
                    onChange={onSpecialtyChange}
                >
                    <option value="">Seleccionar especialidad</option>
                    {specialties.length > 0 ? (
                        specialties.map(specialty => (
                            <option key={specialty.id} value={specialty.id}>
                                {specialty.name}
                            </option>
                        ))
                    ) : (
                        <option disabled>No hay especialidades disponibles</option>
                    )}
                </select>
                <p className="text-danger">{errors?.specialty}</p>
            </div>

            <div className="mb-3">
                <input
                    type="hidden"
                    name="id"
                    value={id} />

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
    )
}