export const appointmentReducer = (state = [], action) => {

    switch (action.type) {
        case "loadAppointments":
            return action.payload;
        case "addAppointment":
            return [...state, action.payload];
        case "updateAppointment":
            return state.map((appointment) =>
                appointment.id === action.payload.id ? action.payload : appointment
            );
        case "removeAppointment":
            return state.filter((appointment) => appointment.id !== action.payload);
        default:
            return state;
    }
};
