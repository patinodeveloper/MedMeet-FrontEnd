import { useReducer, useState } from "react";
import { patientReducer } from "../reducers/patientReducer";
import Swal from "sweetalert2";
import { findAllPatients, savePatient, updatePatient, removePatient } from "../api/services/patientServices";

const initialPatients = [];
const initialPatientForm = { id: 0, firstName: "", lastName: "", age: 0, sex: "", phoneNumber: "", address: "" };
const initialErrors = { firstName: "", lastName: "", age: 0, sex: "", phoneNumber: "", address: "" };

export const usePatients = () => {
    const [patients, dispatch] = useReducer(patientReducer, initialPatients);
    const [patientSelected, setPatientSelected] = useState(initialPatientForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState(initialErrors);

    const [isLoading, setIsLoading] = useState(false);

    const getPatients = async () => {
        setIsLoading(true);
        try {
            const result = await findAllPatients();
            dispatch({
                type: "loadPatients",
                payload: result
            });
            setErrors({});
        } catch (error) {
            console.error("Error", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlerAddPatient = async (patient) => {
        console.log(patient);
        const type = (patient.id === 0) ? "addPatient" : "updatePatient";
        let response;
        try {
            if (patient.id === 0) {
                response = await savePatient({
                    ...patient,
                });
            } else {
                response = await updatePatient({
                    ...patient,
                });
            }

            dispatch({
                type: type,
                payload: response.data,
            });

            Swal.fire(
                (patient.id === 0) ? "Paciente Registrado" : "Paciente Actualizado",
                (patient.id === 0)
                    ? "El paciente ha sido registrado con éxito"
                    : "El paciente ha sido actualizado con éxito",
                "success"
            );
            handlerCloseForm();
        } catch (error) {
            if (error.response?.status === 400) {
                setErrors(error.response.data);
            } else {
                console.error("Error saving doctor", error);
                throw error;
            }
        }
    };

    const handlerRemovePatient = async (id) => {
        Swal.fire({
            le: "¿Está seguro que desea eliminar?",
            text: "Esta acción es irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                removePatient(id);

                dispatch({
                    type: "removePatient",
                    payload: id
                })
                Swal.fire({
                    title: "Paciente Eliminado!",
                    text: "El Paciente se ha eliminado exitosamente",
                    icon: "success"
                });
            }
        });
    };

    const handlerPatientSelectedForm = (patient) => {
        if (!patient) {
            console.error("Error!, El paciente seleccionado no esta definido.");
            return;
        }
        setVisibleForm(true);
        setPatientSelected({
            ...patient,
        });
    };

    const handlerOpenForm = () => {
        setVisibleForm(true);
    };

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setPatientSelected(initialPatientForm);
        setErrors({});
    };

    return {
        patients,
        patientSelected,
        initialPatientForm,
        visibleForm,
        errors,
        isLoading,

        handlerAddPatient,
        handlerRemovePatient,
        handlerPatientSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getPatients
    };
}