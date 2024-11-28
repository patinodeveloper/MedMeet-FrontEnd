import { useReducer, useState } from "react";
import { doctorReducer } from "../reducers/doctorReducer";
import Swal from "sweetalert2";
import { findAllDoctors, saveDoctor, updateDoctor, removeDoctor } from "../api/services/doctorServices";
import { useSpecialties } from "./useSpecialties";

const initialDoctors = [];
const initialDoctorForm = { id: 0, firstName: "", lastName: "", email: "", specialty: "" };
const initialErrors = {
    username: '',
    password: '',
    email: ''
}

export const useDoctors = () => {
    const [doctors, dispatch] = useReducer(doctorReducer, initialDoctors);
    const [doctorSelected, setDoctorSelected] = useState(initialDoctorForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState(initialErrors);

    const [isLoading, setIsLoading] = useState(false); 

    const { specialties, error: specialtiesError } = useSpecialties();

    const getDoctors = async () => {
        setIsLoading(true);
        try {
            const result = await findAllDoctors();
            dispatch({
                type: "loadDoctors",
                payload: result});
            setErrors({});
        } catch (error) {
            console.error("Error fetching doctors", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlerAddDoctor = async (doctor) => {
        console.log(doctor);
        const type = (doctor.id === 0) ? "addDoctor" : "updateDoctor";
        let response;
        try {
            if (doctor.id === 0) {
                response = await saveDoctor({
                    ...doctor,
                    specialtyId: doctor.specialty.id // solo el ID
                });
            } else {
                response = await updateDoctor({
                    ...doctor,
                    specialtyId: doctor.specialty.id
                });
            }

            dispatch({
                type: type,
                payload: response.data,
            });

            Swal.fire(
                (doctor.id === 0) ? "Doctor Registrado" : "Doctor Actualizado",
                (doctor.id === 0)
                    ? "El doctor ha sido registrado con éxito"
                    : "El doctor ha sido actualizado con éxito",
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

    const handlerRemoveDoctor = async (id) => {
        Swal.fire({
            title: "¿Está seguro que desea eliminar?",
            text: "Esta acción es irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                // Elimina el doctor
                removeDoctor(id);
                
                dispatch({
                    type: 'removeDoctor',
                    payload: id
                })
                Swal.fire({
                    title: "Doctor Eliminado!",
                    text: "El Doctor se ha eliminado exitosamente",
                    icon: "success"
                });
            }
        });
    };

    const handlerDoctorSelectedForm = (doctor) => {
        setVisibleForm(true);
        setDoctorSelected({ ...doctor });
    };

    const handlerOpenForm = () => {
        setVisibleForm(true);
    };

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setDoctorSelected(initialDoctorForm);
        setErrors({});
    };


    return {
        doctors,
        doctorSelected,
        initialDoctorForm,
        visibleForm,
        errors,
        isLoading,
        specialties,
        specialtiesError,

        handlerAddDoctor,
        handlerRemoveDoctor,
        handlerDoctorSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getDoctors
    };
};
