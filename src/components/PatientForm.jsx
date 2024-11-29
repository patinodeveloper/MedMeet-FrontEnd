import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PatientContext } from "../context/PatientContext";

export const PatientForm = ({ patientSelected, handlerCloseForm }) => {

    const { handlerAddPatient, initialPatientForm, errors } = useContext(PatientContext);
    const [patientForm, setPatientForm] = useState(initialPatientForm);
    const { id, firstName, lastName, age, sex, phoneNumber, address } = patientForm;

    useEffect(() => {
        setPatientForm({
            ...patientSelected,
        })
    }, [patientSelected]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setPatientForm({
            ...patientForm,
            [name]: value
        });
    }

    const onSubmit = (evt) => {
        evt.preventDefault();

        if (!firstName || !lastName || !age === 0 || !sex || !phoneNumber || !address) {
            Swal.fire({
                title: 'Error de Validacion',
                text: 'Por favor, completa todos los campos del formulario!',
                icon: "error",
            });
            return;
        }
        console.log('Enviando formulario');

        handlerAddPatient(patientForm);
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setPatientForm(initialPatientForm);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="modal-body">
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            name="firstName"
                            value={firstName}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellido</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Apellidos"
                            name="lastName"
                            value={lastName}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Edad</label>
                        <input
                            type="number"
                            className="form-control"
                            name="age"
                            value={age}
                            onChange={onInputChange}
                            min="0"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Sexo</label>
                        <select
                            className="form-select"
                            name="sex"
                            value={sex}
                            onChange={onInputChange}
                        >
                            <option value="">Seleccione</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Telefono"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={onInputChange}
                            maxLength="10"
                            pattern="\d*"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Dirección</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Dirección"
                            name="address"
                            value={address}
                            onChange={onInputChange}
                        />
                    </div>

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
        </>
    )
}