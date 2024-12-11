import { useDoctors } from "../hooks/useDoctors";
import { DoctorContext } from "./DoctorContext";

export const DoctorProvider = ({ children }) => {

    const {
        doctors,
        doctorSelected,
        initialDoctorForm,
        visibleForm,
        errors,
        isLoading,
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
    } = useDoctors();

    return (
        <DoctorContext.Provider value={
            {
                doctors,
                doctorSelected,
                initialDoctorForm,
                visibleForm,
                errors,
                isLoading,
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
            }
        }>
            {children}
        </DoctorContext.Provider>
    );
};
