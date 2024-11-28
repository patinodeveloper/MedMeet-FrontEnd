import { useSpecialties } from "../hooks/useSpecialties";
import { SpecialtyContext } from "./SpecialtyContext";

export const SpecialtyProvider = ({ children }) => {

    const {
        specialties,
        errors,

        getSpecialties
    } = useSpecialties();

    return (
        <SpecialtyContext.Provider value={
            {
                specialties,
                errors,

                getSpecialties
            }
        }>
            {children}
        </SpecialtyContext.Provider>
    );
};
