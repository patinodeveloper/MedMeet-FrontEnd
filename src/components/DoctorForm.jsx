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
            <input
                type="text"
                className="form-control my-3 w-75"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={onInputChange}
            />
            <p className="text-danger">{errors?.firstName}</p>

            <input
                type="text"
                className="form-control my-3 w-75"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={onInputChange}
            />
            <p className="text-danger">{errors?.lastName}</p>

            <input
                type="email"
                className="form-control my-3 w-75"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onInputChange}
            />
            <p className="text-danger">{errors?.email}</p>

            <select
                className="form-control my-3 w-75"
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

            <input
                type="hidden"
                name="id"
                value={id} />

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
                Cerrar Formulario
            </button>}
        </form>
    )
}