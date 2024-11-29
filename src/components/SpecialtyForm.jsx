import { useContext, useEffect, useState } from "react"
import { SpecialtyContext } from "../context/SpecialtyContext"
import Swal from "sweetalert2";
export const SpecialtyForm = ({ specialtySelected, handlerCloseForm }) => {

    const { handlerAddSpecialty, initialSpecialtyForm, errors } = useContext(SpecialtyContext);
    const [specialtyForm, setSpecialtyForm] = useState(initialSpecialtyForm);
    const { id, name } = specialtyForm;

    useEffect(() => {
        setSpecialtyForm({
            ...specialtySelected,
        })
    }, [specialtySelected]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setSpecialtyForm({
            ...specialtyForm,
            [name]: value
        });
    }

    const onSubmit = (evt) => {
        evt.preventDefault();

        if (!name) {
            Swal.fire({
                title: 'Error de Validacion',
                text: 'Por favor, ingresa una especialidad!',
                icon: "error",
            });
            return;
        }
        console.log('Enviando formulario');

        handlerAddSpecialty(specialtyForm);
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setSpecialtyForm(initialSpecialtyForm);
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="modal-body">
                <div className="mb-3">
                    <label className="form-label">Especialidad</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Especialidad"
                        name="name"
                        value={name}
                        onChange={onInputChange}
                    />
                    <p className="text-danger">{errors?.name}</p>

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
            </div>
        </form>
    )
}