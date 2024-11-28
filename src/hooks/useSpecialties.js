import { useState, useReducer } from 'react';
import { specialtiesReducer } from '../reducers/specialtiesReducers';
import { findAllSpecialties } from '../api/services/specialtiesServices';

const initialSpecialties = [];
const initialErrors = {
    firstName: '',
    lastName: '',
    email: '',
    specialty: {}
}

export const useSpecialties = () => {
    const [specialties, dispatch] = useReducer(specialtiesReducer, initialSpecialties);
    const [errors, setErrors] = useState(initialErrors);
    const [isLoading, setIsLoading] = useState(false); 

    const getSpecialties = async () => {
        setIsLoading(true);
        try {
            const result = await findAllSpecialties();
            dispatch({
                type: "loadSpecialties",
                payload: result});
            setErrors({});
        } catch (error) {
            console.error("Error fetching Specialties", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        specialties,
        errors,
        isLoading,

        getSpecialties
    };
};

