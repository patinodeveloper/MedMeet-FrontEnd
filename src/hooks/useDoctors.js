import { useReducer, useState } from "react";
import { doctorReducer } from "../reducers/doctorReducer";
import Swal from "sweetalert2";
import { findAllDoctors, saveDoctor, updateDoctor, removeDoctor, findDoctorsBySpecialty } from "../api/services/doctorServices";
import { useSpecialties } from "./useSpecialties";

const initialDoctors = [];
const initialDoctorForm = { id: 0, firstName: "", lastName: "", email: "", specialty: {id: 0, name: ''} };
const initialErrors = {
    firstName: "",
    lastName: "",
    email: "",
    specialty: {
        id: 0,
        name: ''
    }
}

export const useDoctors = () => {
    const [doctors, dispatch] = useReducer(doctorReducer, initialDoctors);
    const [doctorSelected, setDoctorSelected] = useState(initialDoctorForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState(initialErrors);
    const [isLoading, setIsLoading] = useState(false); 
    const { specialties, error: specialtiesError } = useSpecialties();
    const [searchText, setSearchText] = useState("");

    const getDoctors = async () => {
        setIsLoading(true);
        try {
            const result = await findAllDoctors();
            dispatch({
                type: "loadDoctors",
                payload: result});
            setErrors({});
        } catch (error) {
            console.error("Error al cargar los doctores", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getDoctorsBySpecialty = async (specialtyId) => {
        try {
            const result = await findDoctorsBySpecialty(specialtyId);
            dispatch({
                type: "loadDoctors",
                payload: result
            });
        } catch (error) {
            console.error("Error al obtener doctores por especialidad:", error);
        }
    };

    const handlerAddDoctor = async (doctor) => {
        console.log(doctor);
        console.log(doctor.id);
        const type = (doctor.id === 0) ? "addDoctor" : "updateDoctor";
        let response;
        try {
            if (doctor.id === 0) {
                console.log('save');
                response = await saveDoctor({
                    ...doctor,
                    specialtyId: doctor.specialty.id
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
            setSearchText("");
        } catch (error) {
            if (error.response?.status === 400) {
                setErrors(error.response.data);
            } else {
                console.error("Error al guardar el doctor", error);
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
                setSearchText("");
            }
        });
    };

    const handlerDoctorSelectedForm = (doctor) => {
        if (!doctor) {
            console.error("Error: El doctor seleccionado no está definido.");
            return;
        }
        setVisibleForm(true);
        setDoctorSelected({
            ...doctor,
            specialty: doctor.specialty || { id: 0, name: "" }
        });
    };

    const handlerOpenForm = () => {
        setVisibleForm(true);
    };

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setDoctorSelected(initialDoctorForm);
        setErrors({});
    };

    const filteredDoctors = doctors.filter(doctor =>
        `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchText.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchText.toLowerCase()) ||
        (doctor.specialty?.name || "Sin Especialidad").toLowerCase().includes(searchText.toLowerCase())
    );

    return {
        doctors,
        doctorSelected,
        initialDoctorForm,
        visibleForm,
        errors,
        isLoading,
        specialties,
        specialtiesError,
        filteredDoctors,
        searchText,
        setSearchText,

        handlerAddDoctor,
        handlerRemoveDoctor,
        handlerDoctorSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getDoctors,
        getDoctorsBySpecialty
    };
};
