import { useSpecialties } from "../hooks/useSpecialties";
import { SpecialtyContext } from "./SpecialtyContext";

export const SpecialtyProvider = ({ children }) => {

    const {
        specialties,
        specialtySelected,
        initialSpecialtyForm,
        visibleForm,
        errors,
        isLoading,

        handlerAddSpecialty,
        handlerRemoveSpecialty,
        handlerSpecialtySelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getSpecialties
    } = useSpecialties();

    return (
        <SpecialtyContext.Provider value={
            {
                specialties,
                specialtySelected,
                initialSpecialtyForm,
                visibleForm,
                errors,
                isLoading,

                handlerAddSpecialty,
                handlerRemoveSpecialty,
                handlerSpecialtySelectedForm,
                handlerOpenForm,
                handlerCloseForm,
                getSpecialties
            }
        }>
            {children}
        </SpecialtyContext.Provider>
    );
};
