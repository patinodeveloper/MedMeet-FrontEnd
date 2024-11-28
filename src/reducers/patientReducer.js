export const patientReducer = (state = [], action) => {

    switch (action.type) {
        case "loadPatients":
            return action.payload;
        case "addPatient":
            return [...state, action.payload];
        case "updatePatient":
            return state.map((patient) => 
                patient.id === action.payload.id ? action.payload : patient
            );
        case "removePatient":
            return state.filter((patient) => patient.id !== action.payload);
        default:
            return state;
    }
}