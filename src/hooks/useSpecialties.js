import { useState, useReducer } from 'react';
import { specialtyReducer } from '../reducers/specialtyReducer';
import Swal from "sweetalert2";
import { findAllSpecialties, removeSpecialty, saveSpecialty, updateSpecialty } from '../api/services/specialtyServices';
import { findDoctorsBySpecialty } from '../api/services/doctorServices'

const initialSpecialties = [];
const initialSpecialtyForm = {id: 0, name: ''};
const initialErrors = { name: '' };

export const useSpecialties = () => {
    const [specialties, dispatch] = useReducer(specialtyReducer, initialSpecialties);
    const [specialtySelected, setSpecialtySelected] = useState(initialSpecialtyForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState(initialErrors);
    
    const [isLoading, setIsLoading] = useState(false); 
    const [searchText, setSearchText] = useState("");

    const getSpecialties = async () => {
        setIsLoading(true);
        try {
            const result = await findAllSpecialties();
            const sortedSpecialties = result.sort((a, b) => a.id - b.id);
            dispatch({
                type: "loadSpecialties",
                payload: sortedSpecialties});
            setErrors({});
        } catch (error) {
            console.error("Error al cargar las especialidades", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlerAddSpecialty = async (specialty) => {
        console.log(specialty);
        const type = (specialty.id === 0) ? "addSpecialty" : "updateSpecialty";
        let response;
        try {
            if (specialty.id === 0) {
                response = await saveSpecialty({
                    ...specialty,
                });
            } else {
                response = await updateSpecialty({
                    ...specialty,
                });
            }

            dispatch({
                type: type,
                payload: response.data,
            });

            Swal.fire(
                (specialty.id === 0) ? "Especialidad Registrada" : "Especialidad Actualizada",
                (specialty.id === 0)
                    ? "La especialidad ha sido agregada con éxito"
                    : "La especialidad ha sido actualizada con éxito",
                "success"
            );
            handlerCloseForm();
            setSearchText("");
        } catch (error) {
            if (error.response?.status === 400) {
                setErrors(error.response.data);
            } else {
                console.error("Error al guardar la especialidad", error);
                throw error;
            }
        }
    };

    const handlerRemoveSpecialty = async (id) => {
        try {
            const doctors = await findDoctorsBySpecialty(id);

            if (doctors.length > 0) {
                Swal.fire({
                    title: "No se puede eliminar",
                    text: "Esta especialidad está asociada a al menos un doctor.",
                    icon: "warning",
                });    
            } else {
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
                        removeSpecialty(id);
                        
                        dispatch({
                            type: "removeSpecialty",
                            payload: id
                        })
                        Swal.fire({
                            title: "Especialidad Eliminada!",
                            text: "La especialidad se ha eliminado exitosamente",
                            icon: "success"
                        });
                        setSearchText("");
                    }
                });
            }
        } catch (error) {
            console.error("Error al verificar la especialidad", error);
            Swal.fire("Error", "Hubo un problema al verificar la especialidad.", "error");
        }
    };

    const handlerSpecialtySelectedForm = (specialty) => {
        if (!specialty) {
            console.error("Error!, La especialidad seleccionada no esta definida.");
            return;
        }
        setVisibleForm(true);
        setSpecialtySelected({
            ...specialty,
        });
    };

    const handlerOpenForm = () => {
        setVisibleForm(true);
    };

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setSpecialtySelected(initialSpecialtyForm);
        setErrors({});
    };

    const filteredSpecialties = specialties.filter(specialty =>
        specialty.name.toLowerCase().includes(searchText.toLowerCase()) 
    );

    return {
        specialties,
        specialtySelected,
        initialSpecialtyForm,
        visibleForm,
        errors,
        isLoading,
        searchText,
        setSearchText,
        filteredSpecialties,

        handlerAddSpecialty,
        handlerRemoveSpecialty,
        handlerSpecialtySelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getSpecialties
    };
};

