import { usePatients } from "../hooks/usePatients"
import { PatientContext } from "./PatientContext";

export const PatientProvider = ({ children }) => {

    const {
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
    } = usePatients();

    return (
        <PatientContext.Provider value={
            {
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
            }
        }>
            {children}
        </PatientContext.Provider>
    )
}